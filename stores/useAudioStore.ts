import {mapSongToTrack, Song} from "@/types/song";
import {create} from "zustand";
import TrackPlayer from "react-native-track-player";

interface AudioContextType {
    currentSong: Song | null;
    songsQueue: Song[];
    isPlaying: boolean;
    playSong: (song: Song) => void;
    addSongToQueue: (songs: Song[]) => Promise<string[]>;
    removeSongFromQueue: (songId: string) => Promise<void>;
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
            setState({
                currentSong: song,
                isPlaying: false
            });

            const trackData = {
                url: song.uri,
                artist: song.artist,
                duration: song.duration,
                title: song.title,
                artwork: song.artwork,
            };

            await TrackPlayer.reset();
            await TrackPlayer.add([trackData]);
            await TrackPlayer.play();

            setState({isPlaying: true});

        } catch (error) {
            console.error("Erreur lors de la lecture:", error);
            setState({
                isPlaying: false,
                currentSong: getState().currentSong
            });
        }
    },
    addSongToQueue: async (songs: Song[]) => {
        const newSongs: Song[] = [];
        const messages: string[] = [];

        for (const song of songs) {
            if (!isPresentInQueue(getState().songsQueue, song.id)) {
                await TrackPlayer.add(mapSongToTrack(song));
                newSongs.push(song);
                messages.push("Ajouté à la file");
            } else {
                messages.push("Déjà présent dans la file");
            }
        }

        if (newSongs.length > 0) {
            setState((state) => ({
                songsQueue: [...state.songsQueue, ...newSongs]
            }));
        }

        if (!getState().currentSong && songs.length > 0) {
            getState().playSong(songs[0]);
        }

        return messages;
    },
    removeSongFromQueue: async (songId: string) => {
        const state = getState();
        const songIndex = state.songsQueue.findIndex(song => song.id === songId);

        const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

        if (currentTrackIndex === songIndex) {
            await TrackPlayer.stop();
            setState({currentSong: null, isPlaying: false});
        }

        await TrackPlayer.remove([songIndex]);

        setState((state) => ({
            songsQueue: state.songsQueue.filter(song => song.id !== songId)
        }));
    },
    togglePlayPause: async () => {
        const {isPlaying} = getState();

        try {
            if (isPlaying) {
                await TrackPlayer.pause();
            } else {
                await TrackPlayer.play();
            }
            setState({isPlaying: !isPlaying});
        } catch (error) {
            console.error("Erreur lors du toggle play/pause:", error);
        }
    },
    setCurrentSong: (song: Song) => setState({currentSong: song}),
    seekTo: async (value: number) => {
        await TrackPlayer.seekTo(value);
    },
}))

const isPresentInQueue = (queue: Song[], id: string | undefined) => {
    return queue.some(song => song.id === id);
}

export default useAudioStore;
