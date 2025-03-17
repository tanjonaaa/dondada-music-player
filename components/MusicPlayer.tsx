import {Text, TouchableOpacity, useColorScheme, View, Image} from "react-native";
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
                {currentSong?.artwork && (
                    <Image 
                        source={{ uri: currentSong.artwork }}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            marginRight: 12,
                            marginLeft: -40,
                            marginTop: -6,
                            borderWidth: 2,
                            borderColor: colorScheme === "dark" ? "#ffffff20" : "#00000020"
                        }}
                    />
                )}
                <View style={[styles.songMetadata, { flex: 1 }]}>
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