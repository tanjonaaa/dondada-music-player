import {Song} from "@/types/song";
import {create} from "zustand";
import TrackPlayer from "react-native-track-player";

interface AudioContextType {
    currentSong: Song | null;
    songsQueue: Song[];
    isPlaying: boolean;
    playSong: (song: Song) => void;
    addSongToQueue: (song: Song) => Promise<void>;
    togglePlayPause: () => Promise<void>;
    setCurrentSong: (song: Song) => void;
}

const useAudioStore = create<AudioContextType>((setState, getState) => ({
    currentSong: null,
    songsQueue: [],
    isPlaying: false,
    playSong: async (song: Song) => {
        await TrackPlayer.reset();
        await TrackPlayer.add([
            {
                url: song.uri,
                artist: song.artist,
                duration: song.duration,
                title: song.title,
            }
        ]);
        await TrackPlayer.play();

        setState({
            currentSong: song,
            isPlaying: true,
            songsQueue: getState().songsQueue
        });
    },
    addSongToQueue: async (song: Song) => {
        await TrackPlayer.add([
            {
                url: song.uri,
                artist: song.artist,
                duration: song.duration,
                title: song.title,
            }
        ]);

        setState((state) => ({songsQueue: [...state.songsQueue, song]}));

        if (!getState().currentSong) {
            getState().playSong(song);
        }
    },
    togglePlayPause: async () => {
        const {isPlaying} = getState();

        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }

        setState({isPlaying: !isPlaying});
    },
    setCurrentSong: (song: Song) => setState({currentSong: song}),
}))

export default useAudioStore;
