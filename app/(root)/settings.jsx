import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import useSettingsStyles from "../../assets/styles/settings.styles.js";
import { Ionicons } from "@expo/vector-icons";
import { SafeScreen } from "../../components/SafeScreen";
import useTheme from "../../hooks/useTheme";

const Settings = () => {
    const dynamicStyles = useSettingsStyles();
    const { isLoading, currentTheme, themeColors, themeOptions, handleThemeChange } = useTheme();
    const [showDropdown, setShowDropdown] = useState(false);

    if (isLoading) {
        return (
            <SafeScreen>
                <View style={dynamicStyles.container}>
                    <Text style={dynamicStyles.headerTitle}>Loading...</Text>
                </View>
            </SafeScreen>
        );
    }

    return (
        <SafeScreen>
            <ScrollView style={dynamicStyles.container} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={dynamicStyles.header}>
                    <Text style={dynamicStyles.headerTitle}>Settings</Text>
                    <Text style={dynamicStyles.headerSubtitle}>Customize your app experience</Text>
                </View>

                {/* Theme Selection Section */}
                <View style={dynamicStyles.section}>
                    <Text style={dynamicStyles.sectionTitle}>Appearance</Text>

                    <View style={dynamicStyles.dropdownContainer}>
                        <TouchableOpacity
                            style={[dynamicStyles.themeCard, showDropdown && dynamicStyles.themeCardActive]}
                            onPress={() => setShowDropdown(!showDropdown)}
                            activeOpacity={0.7}
                        >
                            <View>
                                <Text style={dynamicStyles.themeCardLabel}>Theme</Text>
                                <Text style={dynamicStyles.themeValue}>
                                    {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
                                </Text>
                            </View>
                            <Ionicons
                                name={showDropdown ? "chevron-up" : "chevron-down"}
                                size={24}
                                color={themeColors.primary}
                            />
                        </TouchableOpacity>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <View style={dynamicStyles.dropdownList}>
                                {themeOptions.map((theme, index) => (
                                    <TouchableOpacity
                                        key={theme}
                                        style={[
                                            dynamicStyles.dropdownItem,
                                            index === themeOptions.length - 1 && dynamicStyles.dropdownItemLast,
                                            currentTheme === theme && dynamicStyles.dropdownItemActive,
                                        ]}
                                        onPress={() => {
                                            handleThemeChange(theme);
                                            setShowDropdown(!showDropdown);
                                        }}
                                        activeOpacity={0.6}
                                    >
                                        <Text style={dynamicStyles.dropdownItemText}>
                                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                        </Text>
                                        {currentTheme === theme && (
                                            <Ionicons name="checkmark-circle" size={20} color={themeColors.primary} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Theme Preview */}
                    <View style={dynamicStyles.themePreview}>
                        <Text style={dynamicStyles.previewLabel}>Current Theme Colors</Text>
                        <View style={dynamicStyles.previewColors}>
                            <View style={[dynamicStyles.colorBox, { backgroundColor: themeColors.primary }]}>
                                <Text style={dynamicStyles.colorName}>Primary</Text>
                            </View>
                            <View style={[dynamicStyles.colorBox, { backgroundColor: themeColors.income }]}>
                                <Text style={dynamicStyles.colorName}>Income</Text>
                            </View>
                            <View style={[dynamicStyles.colorBox, { backgroundColor: themeColors.expense }]}>
                                <Text style={dynamicStyles.colorName}>Expense</Text>
                            </View>
                            <View style={[dynamicStyles.colorBox, { backgroundColor: themeColors.border }]}>
                                <Text style={dynamicStyles.colorName}>Border</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info Box */}
                <View style={dynamicStyles.infoBox}>
                    <View style={dynamicStyles.infoIcon}>
                        <Ionicons name="information-circle" size={20} color={themeColors.white} />
                    </View>
                    <Text style={dynamicStyles.infoText}>
                        Your theme preference is saved automatically. Restart the app to see changes applied throughout.
                    </Text>
                </View>
            </ScrollView>
        </SafeScreen>
    );
};

export default Settings;
