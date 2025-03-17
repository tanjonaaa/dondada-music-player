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
    seekTo: (value: number) => Promise<void>;
}

const useAudioStore = create<AudioContextType>((setState, getState) => ({
    currentSong: null,
    songsQueue: [],
    isPlaying: false,
    playSong: async (song: Song) => {
        try {
            const trackData = {
                url: song.uri,
                artist: song.artist,
                duration: song.duration,
                title: song.title,
                artwork: song.artwork,
            };

            await TrackPlayer.reset();
            await TrackPlayer.add([trackData]);
            
            setState({
                currentSong: song,
                isPlaying: true,
                songsQueue: getState().songsQueue
            });
            
            await TrackPlayer.play();
        } catch (error) {
            console.error("Erreur lors de la lecture:", error);
            setState({ isPlaying: false });
        }
    },
    addSongToQueue: async (song: Song) => {
        const trackData = {
            url: song.uri,
            artist: song.artist,
            duration: song.duration,
            title: song.title,
            artwork: song.artwork,
        };

        try {
            await TrackPlayer.add([trackData]);
            setState((state) => ({
                songsQueue: [...state.songsQueue, song]
            }));

            if (!getState().currentSong) {
                getState().playSong(song);
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout à la file d'attente:", error);
        }
    },
    togglePlayPause: async () => {
        const {isPlaying} = getState();
        
        setState({isPlaying: !isPlaying});

        try {
            if (isPlaying) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }
        } catch (error) {
            console.error("Erreur lors du toggle play/pause:", error);
            setState({isPlaying: isPlaying});
        }
    },
    setCurrentSong: (song: Song) => setState({currentSong: song}),
    seekTo: async (value: number) => {
        await TrackPlayer.seekTo(value);
    },
}))

export default useAudioStore;
