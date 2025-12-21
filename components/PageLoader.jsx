import { View, ActivityIndicator, Text } from "react-native";
import useHomeStyles from "../assets/styles/home.styles.js";
import useTheme from "../hooks/useTheme";

const PageLoader = ({text}) => {
    const { themeColors: COLORS } = useTheme();
    const styles = useHomeStyles();
    return (
        <View style={styles.clerkLoadingContainer}>
            <View
                style={{
                    padding: 20,
                    backgroundColor: COLORS.border,
                    borderRadius: 16,
                    // height: 150,
                    width: 150,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={{ textAlign: "center", fontSize: 16 }}>{text}</Text>
            </View>
        </View>
    );
};

export default PageLoader;
