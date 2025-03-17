import {Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import useAudioStore from "@/stores/useAudioStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useTheme} from "@react-navigation/core";
import {useState} from "react";

function SongMetadata({song}: { song: Song }) {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {colors, fonts} = useTheme();
    const {addSongToQueue} = useAudioStore();
    const colorScheme = useColorScheme();
    const tooltipBgColor = colorScheme === 'dark' ? "#2a2e42" : colors.primary;

    return (
        <View style={localStyles.songItemContent}>
            <View style={localStyles.songMetadata}>
                <Text style={{
                    color: colors.primary,
                    fontFamily: fonts.heavy.fontFamily,
                }} numberOfLines={1}>{song.title}</Text>
                <Text style={[styles.songArtist, {
                    color: colors.text,
                    fontFamily: fonts.regular.fontFamily
                }]}>{song.artist} - {song.formattedDuration}</Text>
            </View>
            <Pressable onPress={() => addSongToQueue(song)} style={localStyles.queueIcon}
                       onPressIn={() => setTooltipVisible(true)} onPressOut={() => setTooltipVisible(false)}>
                <MaterialIcons name="queue-music" color={colors.primary} size={25} style={{marginHorizontal: 'auto'}}/>
                {tooltipVisible &&
                    <View style={[localStyles.tooltip, {backgroundColor: tooltipBgColor}]}>
                        <Text style={{color: colors.text, fontFamily: fonts.regular.fontFamily}}>Queued</Text>
                    </View>
                }
            </Pressable>
        </View>
    );
}

export default function SongItem({song, index}: { song: Song, index: string }) {
    const {colors, fonts} = useTheme();
    const {playSong} = useAudioStore();

    return (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() => playSong(song)}
        >
            <Text style={{
                marginVertical: 'auto',
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
                width: "8%"
            }}>{index}</Text>
            <SongMetadata song={song}/>
        </TouchableOpacity>
    );
}

const localStyles = StyleSheet.create({
    songItemContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    songMetadata: {
        width: "80%"
    },
    tooltip: {
        position: 'absolute',
        top: 20,
        padding: 5,
        borderRadius: 3,
        alignSelf: 'center',
    },
    queueIcon: {
        width: '50%'
    }
});
