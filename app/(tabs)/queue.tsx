import useAudioStore from "@/stores/useAudioStore";
import SongsList from "@/components/SongsList";
import MusicPlayer from "@/components/MusicPlayer";
import {View} from "react-native";
import {styles} from "@/styles/index.styles";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
export default function Queue() {
    const {songsQueue, currentSong} = useAudioStore();

    return (
        <View style={styles.container}>
            <View style={styles.musicPlayerContainer}>
                <GlobalMusicPlayer />
            </View>
            
            <View style={styles.songsListContainer}>
                <SongsList songs={songsQueue} loading={false}/>
            </View>
        </View>
    )
}