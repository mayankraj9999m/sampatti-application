import { StyleSheet } from "react-native";
import useTheme from "../../hooks/useTheme";

const useSettingsStyles = () => {
    const { themeColors } = useTheme();
    
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: themeColors.background,
            paddingHorizontal: 20,
            paddingVertical: 24,
        },
        header: {
            marginBottom: 32,
        },
        headerTitle: {
            fontSize: 28,
            fontWeight: "bold",
            color: themeColors.text,
            marginBottom: 8,
        },
        headerSubtitle: {
            fontSize: 14,
            color: themeColors.textLight,
        },
        section: {
            marginBottom: 28,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: "600",
            color: themeColors.text,
            marginBottom: 12,
            marginLeft: 4,
        },
        themeCard: {
            backgroundColor: themeColors.card,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 14,
            borderWidth: 1,
            borderColor: themeColors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        themeCardActive: {
            borderColor: themeColors.primary,
            borderWidth: 2,
            backgroundColor: themeColors.backgroundLight,
        },
        themeCardLabel: {
            fontSize: 16,
            color: themeColors.text,
            fontWeight: "500",
        },
        themeValue: {
            fontSize: 14,
            color: themeColors.primary,
            fontWeight: "600",
        },
        dropdownContainer: {
            position: "relative",
            zIndex: 10,
        },
        dropdownList: {
            backgroundColor: themeColors.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: themeColors.border,
            marginTop: 8,
            overflow: "hidden",
            borderTopWidth: 0,
        },
        dropdownItem: {
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: themeColors.border,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        dropdownItemLast: {
            borderBottomWidth: 0,
        },
        dropdownItemText: {
            fontSize: 14,
            color: themeColors.text,
            fontWeight: "500",
            textTransform: "capitalize",
        },
        dropdownItemActive: {
            backgroundColor: themeColors.backgroundLight,
        },
        themePreview: {
            marginTop: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            backgroundColor: themeColors.card,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: themeColors.border,
        },
        previewLabel: {
            fontSize: 12,
            color: themeColors.textLight,
            marginBottom: 8,
            fontWeight: "600",
        },
        previewColors: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },
        colorBox: {
            width: "23%",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
        },
        colorName: {
            fontSize: 15,
            color: themeColors.white,
            textAlign: "center",
        },
        infoBox: {
            backgroundColor: themeColors.primary,
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginTop: 24,
            flexDirection: "row",
            alignItems: "flex-start",
        },
        infoIcon: {
            marginRight: 12,
            marginTop: 2,
        },
        infoText: {
            flex: 1,
            fontSize: 13,
            color: themeColors.white,
            lineHeight: 20,
        },
    });
};

export default useSettingsStyles;
