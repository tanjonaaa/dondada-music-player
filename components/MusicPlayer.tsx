import {Text, TouchableOpacity, useColorScheme, View} from "react-native";
import {styles} from "@/styles/index.styles";
import {AntDesign} from "@expo/vector-icons";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import useSongStore from "@/stores/useSongStore";

export default function MusicPlayer() {
    const colorScheme = useColorScheme();
    const {colors, fonts} = useTheme();
    const {currentSong, togglePlayPause, isPlaying} = useAudioStore();
    const {setSongToShow} = useSongStore();

    const songTitleColor = colorScheme === "dark" ? colors.primary : colors.background;
    const musicPlayerBgColor = colorScheme === "dark" ? "#2a2e42" : colors.primary;

    return (
        <TouchableOpacity onPress={() => setSongToShow(currentSong)}>
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
        </TouchableOpacity>
    )
}