import useAudioStore from "@/stores/useAudioStore";
import SongsList from "@/components/SongsList";
import MusicPlayer from "@/components/MusicPlayer";
import {View} from "react-native";
import {styles} from "@/styles/index.styles";

export default function Queue() {
    const {songsQueue, currentSong} = useAudioStore();

    return (
        <View style={styles.container}>
            <SongsList songs={songsQueue} loading={false}/>

            {currentSong && (
                <MusicPlayer />
            )}
        </View>
    )
}