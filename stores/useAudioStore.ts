import {mapSongToTrack, Song} from "@/types/song";
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
    seekTo: (value: number) => Promise<void>;
}

const useAudioStore = create<AudioContextType>((setState, getState) => ({
    currentSong: null,
    songsQueue: [],
    isPlaying: false,
    playSong: async (song: Song) => {
        setState({
            currentSong: song,
            isPlaying: true,
            songsQueue: getState().songsQueue
        });

        await TrackPlayer.reset();
        await TrackPlayer.add([mapSongToTrack(song)]);
        await TrackPlayer.play();
    },
    addSongToQueue: async (song: Song) => {
        await TrackPlayer.add([mapSongToTrack(song)]);

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
    seekTo: async (value: number) => {
        await TrackPlayer.seekTo(value);
    },
}))

export default useAudioStore;
