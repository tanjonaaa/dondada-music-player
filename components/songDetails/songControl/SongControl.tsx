import {StyleSheet, View, TouchableOpacity} from "react-native";
import SongProgressControl from "@/components/songDetails/songControl/SongProgressControl";
import {MaterialIcons} from "@expo/vector-icons";
import useAudioStore from "@/stores/useAudioStore";
import {useTheme} from "@react-navigation/native";

export default function SongControl() {
    const {colors} = useTheme();
    const {isPlaying, togglePlayPause, skipToNext, skipToPrevious} = useAudioStore();

    return (
        <View>
            <SongProgressControl />
            <View style={styles.controlsContainer}>
                <TouchableOpacity onPress={skipToPrevious}>
                    <MaterialIcons name="skip-previous" size={50} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={togglePlayPause}>
                    <MaterialIcons 
                        name={isPlaying ? "pause-circle-filled" : "play-circle-filled"} 
                        size={70} 
                        color={colors.primary} 
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <MaterialIcons name="skip-next" size={50} color={colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 20,
        width: '100%'
    }
});
