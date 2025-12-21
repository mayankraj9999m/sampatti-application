import { useClerk } from "@clerk/clerk-expo";
import { Alert, Text, TouchableOpacity } from "react-native";
import useHomeStyles from "../assets/styles/home.styles.js";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../hooks/useTheme.js";

export const SignOutButton = ({ textBased }) => {
    const styles = useHomeStyles();
    const { themeColors: COLORS } = useTheme();
    // Use `useClerk()` to access the `signOut()` function
    const { signOut } = useClerk();
    const handleSignOut = async () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            { text: "Logout", style: "destructive", onPress: signOut },
        ]);
    };
    return (
        <>
            {textBased ? (
                <TouchableOpacity onPress={handleSignOut} style={styles.signOut}>
                    <Text style={{ color: COLORS.white, fontWeight: "bold" }}>Sign Out</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
                </TouchableOpacity>
            )}
        </>
    );
};
