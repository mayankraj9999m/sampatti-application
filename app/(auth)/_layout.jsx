import { Redirect, Stack } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import PageLoader from "../../components/PageLoader";
import { SafeScreen } from "../../components/SafeScreen.jsx";

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    if (!isLoaded) return <PageLoader text={"Checking authentication"} />;

    if (isSignedIn) {
        return <Redirect href={"/"} />;
    }

    return (
        <SafeScreen>
            <Stack screenOptions={{ headerShown: false }} />
        </SafeScreen>
    );
}
