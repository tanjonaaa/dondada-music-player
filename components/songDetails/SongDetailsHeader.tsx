import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/core";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useSongStore from "@/stores/useSongStore";

export default function SongDetailsHeader() {
    const {colors, fonts} = useTheme();
    const {setSongToShow} = useSongStore();

    return (
        <View style={styles.container}>
            <MaterialIcons name="keyboard-arrow-down" size={24} color={colors.primary} onPress={() => setSongToShow(null)}/>
            <Text style={{fontFamily: fonts.heavy.fontFamily, color: colors.primary}}>
                Now Playing
            </Text>
            <MaterialIcons name="queue-music" size={24} color={colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: "100%",
        marginTop: 15
    }
});
