import {useState} from 'react';
import {View} from "react-native";
import {styles} from '@/styles/index.styles';
import {Song} from '@/types/song';
import MusicPlayer from "@/components/MusicPlayer";
import TrackPlayer from "react-native-track-player";
import SongsList from "@/components/SongsList";
import {useSongs} from "@/hooks/useSongs";

export default function Index() {
    const {songs, loading} = useSongs();
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async (song: Song) => {
        await TrackPlayer.add([
            {
                url: song.uri
            }
        ]);

        await TrackPlayer.play()

        setIsPlaying(true);
        setCurrentSong(song);
    };

    const togglePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <View style={styles.container}>
            <SongsList songs={songs} loading={loading}/>

            {currentSong && (
                <MusicPlayer
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                />
            )}
        </View>
    );
}
