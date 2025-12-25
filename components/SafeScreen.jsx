import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme.js";

export const SafeScreen = ({ children }) => {
    const { themeColors: COLORS } = useTheme();
    const insets = useSafeAreaInsets();

    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                flex: 1,
                backgroundColor: COLORS.background,
            }}
        >
            {children}
        </View>
    );
};
