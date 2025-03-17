import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles} from "@/styles/index.styles";
import {AntDesign} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import {Event, useTrackPlayerEvents} from "react-native-track-player";
import {mapTrackToSong} from "@/types/song";

export default function MusicPlayer() {
    const colorScheme = useColorScheme();
    const {colors, fonts} = useTheme();
    const {currentSong, togglePlayPause, isPlaying, setCurrentSong} = useAudioStore();

    const songTitleColor = colorScheme === "dark" ? colors.primary : colors.background;
    const musicPlayerBgColor = colorScheme === "dark" ? "#2a2e42" : colors.primary;

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
            const song = mapTrackToSong(event.track);
            setCurrentSong(song);
        }
    });

    return (
        <View style={[styles.player, {backgroundColor: musicPlayerBgColor}]}>
            <View style={styles.songMetadata}>
                <Text style={[styles.currentTitle, {
                    color: songTitleColor,
                    fontFamily: fonts.bold.fontFamily
                }]}
                      numberOfLines={1}>
                    {currentSong?.title}
                </Text>
                <Text style={{color: colors.text, fontFamily: fonts.regular.fontFamily}}>
                    {currentSong?.artist}
                </Text>
            </View>
            <TouchableOpacity onPress={togglePlayPause}>
                <AntDesign
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color={colors.text}
                />
            </TouchableOpacity>
        </View>
    )
}