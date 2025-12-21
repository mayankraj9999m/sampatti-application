// React custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api.js";
import { isValidDateYYYYMMDD } from "../lib/utils.js";

// useTransactions custom hook
export const useTransactions = (userId) => {
    // Setting loading state to true when data is being fetched for the user's transactions and user spending summary
    const [isLoading, setIsLoading] = useState(true);
    // User's transactions and summary
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    });
    const [dateSummary, setDateSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0,
    });
    const [totalDailyTransactions, setTotalDailyTransactions] = useState(0);
    const [dailyTransactions, setDailyTransactions] = useState([]);
    const [nextCursor, setNextCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    // useCallback is used for performance reasons, it will memoize the function
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}?limit=5`);
            const data = await response.json();
            setTransactions(JSON.stringify(data?.data, null, 4));
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

    const fetchTransactionsByDate = useCallback(
        async ({ date, limit = 4, asc = false, cursor = null, append = false }) => {
            try {
                if (!date || !isValidDateYYYYMMDD(date)) return { data: [], nextCursor: null, hasNextPage: false };

                const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                let queryString = `?date=${date}&limit=${limit}&asc=${asc}&timezone=${timezone}`;
                if (cursor) {
                    queryString += `&cursor=${cursor}`;
                }

                const response = await fetch(`${API_URL}/transactions/filter/${userId}` + queryString);
                const data = await response.json();

                const resData = data?.data || [];
                const nextCursorRes = data?.nextCursor || null;
                const hasNextPage = data?.hasNextPage || false;

                setNextCursor(nextCursorRes);
                setHasNextPage(hasNextPage);

                if (append) {
                    setDailyTransactions((prev) => [...prev, ...resData]);
                } else {
                    setDailyTransactions(resData);
                }
            } catch (error) {
                console.error("Error fetching transactions by date:", error);
                return { data: [], nextCursor: null, hasNextPage: false };
            }
        },
        [userId]
    );

    const fetchSummaryByDate = useCallback(
        async ({ date, timezone }) => {
            try {
                if (!date || !isValidDateYYYYMMDD(date) || !timezone) {
                    return;
                }

                const response = await fetch(
                    `${API_URL}/transactions/summary/date/${userId}?date=${date}&timezone=${timezone}`
                );
                const data = await response.json();
                setDateSummary(JSON.stringify(data?.data, null, 4));
                setTotalDailyTransactions(data?.total);
            } catch (error) {
                console.error("Error fetching summary:", error);
            }
        },
        [userId]
    );

    const fetchSummary = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const data = await response.json();
            setSummary(JSON.stringify(data?.data, null, 4));
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, [userId]);

    // PUBLIC function
    const loadData = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);

        try {
            // can be run in parallel
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userId]);

    const loadDailyData = useCallback(
        async ({ date, limit = 4, asc = false, cursor = null, append = false }) => {
            if (!userId) return;

            if (append) {
                setIsLoadingMore(true);
                await fetchTransactionsByDate({ date, limit, asc, cursor, append });
                setIsLoadingMore(false);
                return;
            }

            setIsLoading(true);

            // Get device timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

            try {
                // can be run in parallel
                await Promise.all([
                    fetchTransactionsByDate({ date, limit, asc, cursor }),
                    fetchSummaryByDate({ date, timezone }),
                ]);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setIsLoading(false);
            }
        },
        [fetchTransactionsByDate, fetchSummaryByDate, userId]
    );

    // PUBLIC function
    const deleteTransaction = async (id) => {
        try {
            const response = await fetch(`${API_URL}/transactions/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete transaction");

            // Refresh data after deletion
            // loadData();
            Alert.alert("Success", "Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert.alert("Error", error.message);
        }
    };

    return {
        transactions,
        dailyTransactions,
        summary,
        dateSummary,
        totalDailyTransactions,
        isLoading,
        loadData,
        loadDailyData,
        deleteTransaction,
        nextCursor,
        setNextCursor,
        hasNextPage,
        isLoadingMore,
    };
};
