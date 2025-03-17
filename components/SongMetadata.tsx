import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import {styles} from "@/styles/index.styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import {Song} from "@/types/song";
import {useState} from "react";

export default function SongMetadata({song}: { song: Song }) {
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
