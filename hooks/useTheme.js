import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { THEMES } from "../constants/colors.js";
import { Alert } from "react-native";

const ThemeContext = createContext();

const THEME_KEY = "app_theme";

export const ThemeProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentTheme, setCurrentTheme] = useState("forest");
    const [themeColors, setThemeColors] = useState(THEMES.forest);

    const themeOptions = Object.keys(THEMES);

    useEffect(() => {
        loadTheme();
    }, []);

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem(THEME_KEY);
            if (savedTheme && THEMES[savedTheme]) {
                setCurrentTheme(savedTheme);
                setThemeColors(THEMES[savedTheme]);
            }
        } catch (error) {
            console.log("Error loading theme:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleThemeChange = async (themeName) => {
        try {
            setCurrentTheme(themeName);
            setThemeColors(THEMES[themeName]);
            await AsyncStorage.setItem(THEME_KEY, themeName);
            // Alert.alert("Success", `Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
        } catch (error) {
            console.log("Error changing theme:", error);
            Alert.alert("Error", "Failed to change theme");
        }
    };

    return (
        <ThemeContext.Provider value={{ isLoading, currentTheme, themeColors, loadTheme, handleThemeChange, themeOptions }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default useTheme;
