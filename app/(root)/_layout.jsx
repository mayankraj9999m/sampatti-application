import { useUser } from "@clerk/clerk-expo";
import { Redirect, Tabs, useSegments } from "expo-router";
// import { Stack } from "expo-router/stack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeScreen } from "../../components/SafeScreen.jsx";
import { View } from "react-native";
import CustomHeader from "../../components/CustomHeader.jsx";
import useTheme from "../../hooks/useTheme.js";

export default function Layout() {
    const { themeColors: COLORS } = useTheme();
    const segments = useSegments();
    const { isSignedIn } = useUser();
    if (!isSignedIn) return <Redirect href={"/sign-in"} />;

    const activeTab = segments.at(-1);
    console.log(activeTab);

    const HEADER_TITLES = {
        "(root)": "Summary",
        create: "Add Transaction",
        daily: "Daily Expenses",
        settings: "Settings",
    };

    const headerTitle = HEADER_TITLES[activeTab] ?? "Expense Tracker";

    return (
        <SafeScreen>
            <View style={{ flex: 1 }}>
                <CustomHeader title={headerTitle} />
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: COLORS.textLight,
                        },
                        tabBarActiveTintColor: COLORS.primary,
                        tabBarInactiveTintColor: COLORS.textLight,
                        tabBarStyle: {
                            backgroundColor: COLORS.card,
                            paddingTop: 5,
                            paddingBottom: 5,
                            height: 60,
                            borderTopWidth: 1,
                            borderTopColor: COLORS.border,
                            elevation: 0,
                        },
                        tabBarLabelStyle: {
                            fontSize: 12,
                            fontWeight: "600",
                        },
                    }}
                >
                    <Tabs.Screen
                        name="index"
                        options={{
                            title: "Summary",
                            tabBarIcon: ({ color }) => <FontAwesome size={26} name="home" color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="daily"
                        options={{
                            title: "Daily expenses",
                            tabBarIcon: ({ color }) => <Ionicons name="today" size={28} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="create"
                        options={{
                            title: "Add transaction",
                            tabBarIcon: ({ color }) => <Ionicons name="add-circle" size={28} color={color} />,
                        }}
                    />
                    <Tabs.Screen
                        name="settings"
                        options={{
                            title: "Settings",
                            tabBarIcon: ({ color }) => <Ionicons name="settings" size={28} color={color} />,
                        }}
                    />
                </Tabs>
            </View>
        </SafeScreen>
    );
    // return <Stack screenOptions={{ headerShown: false }} />;
}
