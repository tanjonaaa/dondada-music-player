import {View} from "react-native";
import {styles} from '@/styles/index.styles';
import SongsList from "@/components/SongsList";
import {useSongs} from "@/hooks/useSongs";
import useAudioStore from "@/stores/useAudioStore";
import {SongDetails} from "@/components/songDetails/SongDetails";
import useSongStore from "@/stores/useSongStore";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";

export default function Index() {
    const {songs, loading} = useSongs();
    const {currentSong} = useAudioStore();
    const {songToShow} = useSongStore();

    return (
        <View style={styles.container}>
            <GlobalMusicPlayer />
            <SongsList songs={songs} loading={loading}/>

            {(songToShow && currentSong) && (
                <SongDetails song={currentSong} />
            )}
        </View>
    );
}
