// React custom hook file

import { useCallback, useState } from "react";
import { Alert } from "react-native";
import { API_URL } from "../constants/api.js";

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

    // useCallback is used for performance reasons, it will memoize the function
    const fetchTransactions = useCallback(async () => {
        try {
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(JSON.stringify(data?.data, null, 4));
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userId]);

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

    return { transactions, summary, isLoading, loadData, deleteTransaction };
};
