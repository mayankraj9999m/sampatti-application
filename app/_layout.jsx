import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "../hooks/useTheme";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <ClerkProvider tokenCache={tokenCache}>
                <Slot />
                <StatusBar style="dark" />
            </ClerkProvider>
        </ThemeProvider>
    );
}
