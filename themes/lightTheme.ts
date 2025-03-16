import {DefaultTheme, Theme} from "@react-navigation/native";
import {fonts} from "@/themes/fonts";

export const lightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f6f1f1',
        card: '#fff',
        primary: '#181c27',
        text: '#a1a4a9',
    },
    fonts: {
        regular: {
            fontFamily: fonts.regular,
            fontWeight: "400"
        },
        medium: {
            fontFamily: fonts.medium,
            fontWeight: "500"
        },
        bold: {
            fontFamily: fonts.bold,
            fontWeight: "700"
        },
        heavy: {
            fontFamily: fonts.heavy,
            fontWeight: "900"
        }
    }
}