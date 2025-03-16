import {DarkTheme, Theme} from "@react-navigation/native";
import {fonts} from "@/themes/fonts";

export const darkTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#181c27',
        card: '#181c27',
        primary: '#fff',
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