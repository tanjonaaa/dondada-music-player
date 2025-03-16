import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles} from "@/styles/index.styles";
import {AntDesign} from "@expo/vector-icons";
import {Song} from "@/types/song";
import {useTheme} from "@react-navigation/core";

export default function MusicPlayer({currentSong, isPlaying, togglePlayPause}: {
    currentSong: Song;
    isPlaying: boolean,
    togglePlayPause: () => void
}) {
    const colorScheme = useColorScheme();
    const {colors, fonts} = useTheme();

    const songTitleColor = colorScheme === "dark" ? colors.primary : colors.background;
    const musicPlayerBgColor = colorScheme === "dark" ? "#2a2e42" : colors.primary;

    return (
        <View style={[styles.player, {backgroundColor: musicPlayerBgColor}]}>
            <View style={styles.songMetadata}>
                <Text style={[styles.currentTitle, {
                    color: songTitleColor,
                    fontFamily: fonts.bold.fontFamily
                }]}
                      numberOfLines={1}>
                    {currentSong.title}
                </Text>
                <Text style={{color: colors.text, fontFamily: fonts.regular.fontFamily}}>
                    {currentSong.artist}
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