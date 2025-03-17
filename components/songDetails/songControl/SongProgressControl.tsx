import {StyleSheet, View, Text} from "react-native";
import {useProgress} from "react-native-track-player";
import useAudioStore from "@/stores/useAudioStore";
import Slider from "@react-native-community/slider";
import {useTheme} from "@react-navigation/core";

export default function SongProgressControl() {
    const progress = useProgress();
    const {seekTo} = useAudioStore();
    const {colors, fonts} = useTheme();

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <View style={localStyles.container}>
            <Slider
                style={localStyles.slider}
                value={progress.position}
                minimumValue={0}
                maximumValue={progress.duration}
                onSlidingComplete={seekTo}
                minimumTrackTintColor="#1EB1FC"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#1EB1FC"
            />
            <View style={localStyles.progressionTime}>
                <Text style={[localStyles.timeText, {color: colors.text}]}>
                    {formatTime(progress.position)}
                </Text>
                <Text style={[localStyles.timeText, {color: colors.text}]}>
                    {formatTime(progress.duration)}
                </Text>
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create({
    timeText: {
        fontSize: 16,
    },
    slider: {
        width: "100%",
        height: 40,
    },
    container: {
        width: "100%",
        marginHorizontal: 'auto',
    },
    progressionTime: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
