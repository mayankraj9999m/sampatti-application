import { View, Text, TouchableOpacity, FlatList, Alert, RefreshControl } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "react-native-calendars";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useTransactions } from "../../hooks/useTransactions.js";
import { TransactionItem } from "../../components/TransactionItem.jsx";
import { BalanceCard } from "../../components/BalanceCard.jsx";
import PageLoader from "../../components/PageLoader.jsx";
import useDailyStyles from "../../assets/styles/daily.styles.js";
import useTheme from "../../hooks/useTheme.js";

const Daily = () => {
    const { user } = useUser();
    const { themeColors: COLORS } = useTheme();
    const styles = useDailyStyles();

    // Date states
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false); // Date picker popup
    const [selectedCalendarDate, setSelectedCalendarDate] = useState(new Date().toISOString().split("T")[0]);
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false); // Calendar visibility state
    const [refreshing, setRefreshing] = useState(false);

    // Pagination states
    const [limit, setLimit] = useState(5); // Default limit

    // Transaction data
    const {
        deleteTransaction,
        dateSummary,
        dailyTransactions,
        totalDailyTransactions,
        loadDailyData,
        isLoading,
        hasNextPage,
        nextCursor,
        isLoadingMore,
        setNextCursor,
    } = useTransactions(user?.id);

    useEffect(() => {
        if (user?.id) {
            loadDailyData({ date: selectedCalendarDate, limit });
        }
    }, [user?.id, loadDailyData, selectedCalendarDate, limit]);

    const onChange = (event, selectedDate) => {
        setShow(false);
        if (selectedDate) {
            setDate(selectedDate);
            const dateStr = selectedDate.toISOString().split("T")[0];
            setSelectedCalendarDate(dateStr);
            setNextCursor(null);
        }
    };

    const onCalendarDayPress = (day) => {
        setSelectedCalendarDate(day.dateString);
        setDate(new Date(day.dateString));
    };

    const handleDelete = (id) => {
        Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteTransaction(id);
                    await loadDailyData({ date: selectedCalendarDate, limit: 5 });
                },
            },
        ]);
    };

    const loadMoreTransactions = async () => {
        if (hasNextPage && nextCursor && !isLoadingMore) {
            await loadDailyData({ date: selectedCalendarDate, limit: limit, append: true, cursor: nextCursor });
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        loadDailyData({ date: selectedCalendarDate, limit });
        setRefreshing(false);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
    };

    const getQuickDateOptions = () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        return [
            { label: "Today", date: today.toISOString().split("T")[0] },
            { label: "Yesterday", date: yesterday.toISOString().split("T")[0] },
        ];
    };

    if (isLoading) {
        return <PageLoader text="Loading transactions..." />;
    }

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Daily Expenses</Text>
                <Text style={styles.headerSubtitle}>Track your daily spending</Text>
            </View>

            {/* Daily Summary - Moved to top */}
            <View style={styles.summarySection}>
                <Text style={styles.sectionTitle}>Daily Summary</Text>
                <BalanceCard summary={dateSummary} />
            </View>

            {/* Quick Date Selection */}
            <View style={styles.quickDateSection}>
                <Text style={styles.sectionTitle}>Quick Select</Text>
                <View style={styles.quickDateButtons}>
                    {getQuickDateOptions().map((option) => (
                        <TouchableOpacity
                            key={option.label}
                            style={[
                                styles.quickDateButton,
                                selectedCalendarDate === option.date && styles.quickDateButtonActive,
                            ]}
                            onPress={() => {
                                setSelectedCalendarDate(option.date);
                                setDate(new Date(option.date));
                            }}
                        >
                            <Text
                                style={[
                                    styles.quickDateButtonText,
                                    selectedCalendarDate === option.date && styles.quickDateButtonTextActive,
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Limit Selector */}
            <View style={styles.limitSection}>
                <Text style={styles.sectionTitle}>Items Per Page</Text>
                <View style={styles.limitContainer}>
                    {[5, 10, 20, 50].map((limitOption) => (
                        <TouchableOpacity
                            key={limitOption}
                            style={[styles.limitButton, limit === limitOption && styles.limitButtonActive]}
                            onPress={() => handleLimitChange(limitOption)}
                        >
                            <Text
                                style={[styles.limitButtonText, limit === limitOption && styles.limitButtonTextActive]}
                            >
                                {limitOption}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Date Picker Section */}
            <View style={styles.datePickerSection}>
                <Text style={styles.sectionTitle}>Select Date</Text>
                <TouchableOpacity style={styles.dateButton} onPress={() => setShow(true)}>
                    <Ionicons name="calendar" size={20} color={COLORS.white} />
                    <Text style={styles.dateButtonText}>{date.toDateString()}</Text>
                </TouchableOpacity>

                {show && <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />}
            </View>

            {/* Calendar - Collapsible */}
            <View style={styles.calendarSection}>
                <TouchableOpacity
                    style={styles.calendarHeader}
                    onPress={() => setIsCalendarExpanded(!isCalendarExpanded)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.sectionTitle}>Calendar View</Text>
                    <Ionicons
                        name={isCalendarExpanded ? "chevron-up" : "chevron-down"}
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>

                {isCalendarExpanded && (
                    <View style={styles.calendarContainer}>
                        <Calendar
                            onDayPress={onCalendarDayPress}
                            markedDates={{
                                [selectedCalendarDate]: {
                                    selected: true,
                                    selectedColor: COLORS.primary,
                                },
                            }}
                            theme={{
                                backgroundColor: COLORS.card,
                                calendarBackground: COLORS.card,
                                textSectionTitleColor: COLORS.text,
                                selectedDayBackgroundColor: COLORS.primary,
                                selectedDayTextColor: COLORS.white,
                                todayTextColor: COLORS.primary,
                                dayTextColor: COLORS.text,
                                textDisabledColor: COLORS.textLight,
                                arrowColor: COLORS.primary,
                                monthTextColor: COLORS.text,
                                indicatorColor: COLORS.primary,
                            }}
                        />
                    </View>
                )}
            </View>

            {/* Transactions Header */}
            <View style={styles.transactionsHeader}>
                <Text style={styles.sectionTitle}>Transactions ({totalDailyTransactions})</Text>
                {totalDailyTransactions > 0 && (
                    <Text style={styles.transactionsSubtitle}>Showing transactions for selected date</Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={dailyTransactions}
                renderItem={({ item }) => <TransactionItem item={item} onDelete={handleDelete} />}
                ListHeaderComponent={renderHeader}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Ionicons name="calendar-outline" size={48} color={COLORS.textLight} />
                        <Text style={styles.emptyStateTitle}>No transactions found</Text>
                        <Text style={styles.emptyStateText}>
                            No transactions recorded for {new Date(selectedCalendarDate).toLocaleDateString()}
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => {
                    if (isLoadingMore) {
                        return (
                            <View style={styles.loadingMore}>
                                <Text style={styles.loadingMoreText}>Loading more...</Text>
                            </View>
                        );
                    }
                    if (hasNextPage) {
                        return (
                            <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreTransactions}>
                                <Text style={styles.loadMoreButtonText}>Load More</Text>
                                <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        );
                    }
                    if (dailyTransactions.length > 0) {
                        return (
                            <View style={styles.endOfList}>
                                <Text style={styles.endOfListText}>No more transactions</Text>
                            </View>
                        );
                    }
                    return null;
                }}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

export default Daily;
