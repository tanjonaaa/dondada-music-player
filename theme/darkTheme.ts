import {DarkTheme, Theme} from "@react-navigation/native";

export const darkTheme: Theme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#181c27',
        primary: '#fff',
        text: '#a1a4a9',
    },
    fonts: {
        regular: {
            fontFamily: "Nunito",
            fontWeight: "400"
        },
        medium: {
            fontFamily: "Nunito",
            fontWeight: "500"
        },
        bold: {
            fontFamily: "Nunito",
            fontWeight: "700"
        },
        heavy: {
            fontFamily: "Nunito",
            fontWeight: "900"
        }
    }
}