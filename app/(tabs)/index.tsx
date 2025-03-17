import {View} from "react-native";
import {styles} from '@/styles/index.styles';
import MusicPlayer from "@/components/MusicPlayer";
import SongsList from "@/components/SongsList";
import {useSongs} from "@/hooks/useSongs";
import useAudioStore from "@/stores/useAudioStore";

export default function Index() {
    const {songs, loading} = useSongs();
    const {currentSong} = useAudioStore();

    return (
        <View style={styles.container}>
            <SongsList songs={songs} loading={loading}/>

            {currentSong && (
                <MusicPlayer />
            )}
        </View>
    );
}
