import {View} from "react-native";
import {styles} from '@/styles/index.styles';
import MusicPlayer from "@/components/MusicPlayer";
import SongsList from "@/components/SongsList";
import {useSongs} from "@/hooks/useSongs";
import useAudioStore from "@/stores/useAudioStore";
import {SongDetails} from "@/components/songDetails/SongDetails";
import useSongStore from "@/stores/useSongStore";

export default function Index() {
    const {songs, loading} = useSongs();
    const {currentSong} = useAudioStore();
    const {songToShow} = useSongStore();

    return (
        <View style={styles.container}>
            <SongsList songs={songs} loading={loading}/>

            {(songToShow && currentSong) && (
                <SongDetails song={currentSong} />
            )}

            {currentSong && (
                <MusicPlayer />
            )}
        </View>
    );
}
