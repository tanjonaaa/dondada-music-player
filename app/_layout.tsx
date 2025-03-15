import {Stack} from "expo-router";
import {useColorScheme} from "react-native";
import {ThemeProvider} from "@react-navigation/native";
import {darkTheme, lightTheme} from "@/theme";

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    );
}
