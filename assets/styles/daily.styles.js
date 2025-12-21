import { StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

const useDailyStyles = () => {
    const { themeColors: COLORS } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: COLORS.background,
        },
        headerContainer: {
            // paddingHorizontal: 20,
        },
        header: {
            marginBottom: 20,
            paddingTop: 10,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: "bold",
            color: COLORS.text,
            marginBottom: 4,
        },
        headerSubtitle: {
            fontSize: 14,
            color: COLORS.textLight,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.text,
            marginBottom: 12,
        },
        
        // Quick Date Selection
        quickDateSection: {
            marginBottom: 20,
        },
        quickDateButtons: {
            flexDirection: "row",
            gap: 10,
        },
        quickDateButton: {
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            backgroundColor: COLORS.backgroundLight,
            borderWidth: 1,
            borderColor: COLORS.border,
        },
        quickDateButtonActive: {
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
        },
        quickDateButtonText: {
            fontSize: 14,
            color: COLORS.text,
            fontWeight: "500",
        },
        quickDateButtonTextActive: {
            color: COLORS.white,
        },
        
        // Limit Selector
        limitSection: {
            marginBottom: 20,
        },
        limitContainer: {
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
        },
        limitButton: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 12,
            backgroundColor: COLORS.backgroundLight,
            borderWidth: 1,
            borderColor: COLORS.border,
            minWidth: 60,
            alignItems: "center",
        },
        limitButtonActive: {
            backgroundColor: COLORS.primary,
            borderColor: COLORS.primary,
        },
        limitButtonText: {
            fontSize: 14,
            color: COLORS.text,
            fontWeight: "600",
        },
        limitButtonTextActive: {
            color: COLORS.white,
        },
        
        // Date Picker
        datePickerSection: {
            marginBottom: 20,
        },
        dateButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.primary,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            gap: 10,
        },
        dateButtonText: {
            color: COLORS.white,
            fontSize: 16,
            fontWeight: "500",
        },
        
        // Calendar
        calendarSection: {
            marginBottom: 20,
        },
        calendarHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },
        calendarContainer: {
            backgroundColor: COLORS.card,
            borderRadius: 16,
            padding: 10,
            shadowColor: COLORS.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            marginTop: 10,
        },
        
        // Selected Date Display
        selectedDateSection: {
            marginBottom: 20,
        },
        selectedDateText: {
            fontSize: 16,
            color: COLORS.primary,
            fontWeight: "600",
            textAlign: "center",
            backgroundColor: COLORS.backgroundLight,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: COLORS.border,
        },
        
        // Summary Section
        summarySection: {
            marginBottom: 20,
        },
        
        // Transactions
        transactionsHeader: {
            marginBottom: 15,
        },
        transactionsSubtitle: {
            fontSize: 12,
            color: COLORS.textLight,
            fontStyle: "italic",
        },
        flatListContent: {
            paddingHorizontal: 20,
            paddingBottom: 20,
        },
        
        // Empty State
        emptyState: {
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 40,
            paddingHorizontal: 20,
        },
        emptyStateTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.text,
            marginTop: 16,
            marginBottom: 8,
        },
        emptyStateText: {
            fontSize: 14,
            color: COLORS.textLight,
            textAlign: "center",
            lineHeight: 20,
        },
        
        // Pagination
        loadMoreButton: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.backgroundLight,
            paddingVertical: 12,
            paddingHorizontal: 20,
            borderRadius: 12,
            marginVertical: 20,
            borderWidth: 1,
            borderColor: COLORS.primary,
            gap: 8,
        },
        loadMoreButtonText: {
            fontSize: 14,
            color: COLORS.primary,
            fontWeight: "600",
        },
        loadingMore: {
            paddingVertical: 20,
            alignItems: "center",
        },
        loadingMoreText: {
            fontSize: 14,
            color: COLORS.textLight,
        },
        endOfList: {
            paddingVertical: 20,
            alignItems: "center",
        },
        endOfListText: {
            fontSize: 14,
            color: COLORS.textLight,
            fontStyle: "italic",
        },
    });
};

export default useDailyStyles;