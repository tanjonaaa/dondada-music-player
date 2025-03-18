import {StyleSheet, Text, View, StatusBar} from "react-native";
import {useTheme} from "@react-navigation/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useSongStore from "@/stores/useSongStore";

export default function SongDetailsHeader() {
    const {colors, fonts} = useTheme();
    const {setSongToShow} = useSongStore();

    return (
        <View style={styles.container}>
            <MaterialIcons 
                name="keyboard-arrow-down" 
                size={24} 
                color={colors.primary} 
                onPress={() => setSongToShow(null)}
                style={styles.backButton}
            />
            <Text style={[styles.title, {fontFamily: fonts.heavy.fontFamily, color: colors.primary}]}>
                Now Playing
            </Text>
            <MaterialIcons 
                name="queue-music" 
                size={24} 
                color={colors.primary}
                style={styles.queueButton}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
        paddingHorizontal: 20,
        marginTop: StatusBar.currentHeight || 0, 
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 16,
    },
    queueButton: {
        padding: 8,
    }
});
