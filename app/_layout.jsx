import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "../hooks/useTheme";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout() {
    if (!publishableKey) {
        console.error("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
    }

    return (
        <ThemeProvider>
            <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
                <ClerkLoaded>
                    <Slot />
                    <StatusBar style="dark" />
                </ClerkLoaded>
            </ClerkProvider>
        </ThemeProvider>
    );
}
