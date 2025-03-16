import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import {useTheme} from "@react-navigation/core";

export default function SongItem({song, index}: { song: Song, index: string }) {
    const {colors, fonts} = useTheme();

    return (
        <TouchableOpacity
            style={styles.songItem}
        >
            <Text style={{
                marginVertical: 'auto',
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
            }}>{index}</Text>
            <View>
                <Text style={{
                    color: colors.primary,
                    fontFamily: fonts.heavy.fontFamily,
                }}>{song.title}</Text>
                <Text style={[styles.songArtist, {
                    color: colors.text,
                    fontFamily: fonts.regular.fontFamily
                }]}>{song.artist} - {song.formattedDuration}</Text>
            </View>
        </TouchableOpacity>
    );
}