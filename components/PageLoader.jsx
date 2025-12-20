import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "../assets/styles/home.styles.js";
import { COLORS } from "../constants/colors.js";

const PageLoader = ({text}) => {
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
