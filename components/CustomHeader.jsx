import { View, Text } from "react-native";
import { SignOutButton } from "./SignOutButton";
import useTheme from "../hooks/useTheme";

export default function CustomHeader({title}) {
    const { themeColors: COLORS } = useTheme();
    
    return (
        <View
            style={{
                height: 56,
                backgroundColor: COLORS.border,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                justifyContent: "space-between",
            }}
        >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{title}</Text>

            <SignOutButton textBased={true} />
        </View>
    );
}
