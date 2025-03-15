import {DefaultTheme, Theme} from "@react-navigation/native";

export const lightTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f6f1f1',
        primary: '#181c27',
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