import { create } from "zustand";
import TrackPlayer from "react-native-track-player";
import { mapSongToTrack, Song } from "@/types/song";
import { Event } from "react-native-track-player";

interface AudioState {
  currentSong: Song | null;
  songsQueue: Song[];
  isPlaying: boolean;
  isLoading: boolean;
}

interface AudioActions {
  playSong: (song: Song) => Promise<void>;
  addSongToQueue: (songs: Song[]) => Promise<string[]>;
    removeSongFromQueue: (songId: string) => Promise<void>;
  togglePlayPause: () => Promise<void>;
  setCurrentSong: (song: Song) => void;
  seekTo: (value: number) => Promise<void>;
  skipToNext: () => Promise<void>;
  skipToPrevious: () => Promise<void>;
}

type AudioStore = AudioState & AudioActions;

/**
 * Vérifie si une chanson est déjà présente dans la file d'attente
 */
const isPresentInQueue = (queue: Song[], id: string | undefined): boolean => 
  queue.some(song => song.id === id);

/**
 * Store Zustand pour gérer l'état et les actions liées à l'audio
 */
const useAudioStore = create<AudioStore>((set, get) => ({
  currentSong: null,
  songsQueue: [],
  isPlaying: false,
  isLoading: false,

  playSong: async (song: Song): Promise<void> => {
    try {
      set({
        currentSong: song,
        isPlaying: false,
        isLoading: true
      });

      const { songsQueue } = get();
      
      await TrackPlayer.reset();
      
      const selectedIndex = songsQueue.findIndex(s => s.id === song.id);
      
      if (selectedIndex >= 0) {
        const tracksToAdd = songsQueue.slice(selectedIndex).map(mapSongToTrack);
        await TrackPlayer.add(tracksToAdd);
      } else {
        const trackData = mapSongToTrack(song);
        await TrackPlayer.add([trackData]);
      }
      
      await TrackPlayer.play();

      set({ isPlaying: true, isLoading: false });
    } catch (error) {
      console.error("Erreur lors de la lecture:", error);
      set({
        isPlaying: false,
        isLoading: false,
        currentSong: get().currentSong
      });
    }
  },

  addSongToQueue: async (songs: Song[]): Promise<string[]> => {
    const { songsQueue, currentSong, playSong } = get();
    const messages: string[] = [];

    // Traitement des chansons en lot pour éviter les mises à jour d'état multiples
    const newSongs: Song[] = [];
    
    for (const song of songs) {
      if (!isPresentInQueue(songsQueue, song.id)) {
        newSongs.push(song);
        messages.push("Ajouté à la file");
      } else {
        messages.push("Déjà présent dans la file");
      }
    }

    if (newSongs.length > 0) {
      try {
        await TrackPlayer.add(newSongs.map(mapSongToTrack));
        set({ songsQueue: [...songsQueue, ...newSongs] });
      } catch (error) {
        console.error("Erreur lors de l'ajout à la file:", error);
      }
    }

    // Jouer la première chanson si aucune n'est en cours
    if (!currentSong && songs.length > 0 && songs.length > 0) {
      await playSong(songs[0]);
    }

    return messages;
  },
    removeSongFromQueue: async (songId: string) => {
        const { songsQueue } = get();
        const songIndex = songsQueue.findIndex((song: Song) => song.id === songId);

        const currentTrackIndex = await TrackPlayer.getActiveTrackIndex();

        if (currentTrackIndex === songIndex) {
            await TrackPlayer.stop();
            set({currentSong: null, isPlaying: false});
        }

        await TrackPlayer.remove([songIndex]);

        set({
            songsQueue: songsQueue.filter((song: Song) => song.id !== songId)
        });
    },

  togglePlayPause: async (): Promise<void> => {
    const { isPlaying } = get();

    try {
      if (isPlaying) {
        await TrackPlayer.pause();
      } else {
        await TrackPlayer.play();
      }
      set({ isPlaying: !isPlaying });
    } catch (error) {
      console.error("Erreur lors du toggle play/pause:", error);
    }
  },

  setCurrentSong: (song: Song): void => set({ currentSong: song }),
  
  seekTo: async (value: number): Promise<void> => {
    try {
      await TrackPlayer.seekTo(value);
    } catch (error) {
      console.error("Erreur lors du seek:", error);
    }
  },

  skipToNext: async (): Promise<void> => {
    try {
      await TrackPlayer.skipToNext();
      const trackIndex = await TrackPlayer.getActiveTrackIndex();
      if (trackIndex !== null && trackIndex !== undefined) {
        const track = await TrackPlayer.getTrack(trackIndex);
        if (track) {
          const songTrack: Song = {
            id: track.id,
            title: track.title || '',
            artist: track.artist || '',
            artwork: track.artwork || '',
            uri: track.url || '',
            duration: track.duration || 0
          };
          set({ currentSong: songTrack });
        }
      }
    } catch (error) {
      console.error("Erreur lors du passage à la piste suivante:", error);
    }
  },

  skipToPrevious: async (): Promise<void> => {
    try {
      await TrackPlayer.skipToPrevious();
      const index = await TrackPlayer.getCurrentTrack();
      if (index !== null) {
        const track = await TrackPlayer.getTrack(index);
        if (track) {
          const songTrack: Song = {
            id: track.id,
            title: track.title || '',
            artist: track.artist || '',
            artwork: track.artwork || '',
            uri: track.url || '',
            duration: track.duration || 0
          };
          set({ currentSong: songTrack });
        }
      }
    } catch (error) {
      console.error("Erreur lors du passage à la piste précédente:", error);
    }
  },
}));

export const setupPlayerListeners = () => {
  const { setCurrentSong, skipToNext } = useAudioStore.getState();
  
  const setupPlayer = async () => {
    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, () => {
      skipToNext();
    });
    
    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, async (event) => {
      if (event.track !== null && typeof event.track === 'number') {
        const track = await TrackPlayer.getTrack(event.track);
        if (track) {
          const songTrack: Song = {
            id: track.id,
            title: track.title || '',
            artist: track.artist || '',
            artwork: track.artwork || '',
            uri: track.url || '',
            duration: track.duration || 0
          };
          setCurrentSong(songTrack);
        }
      }
    });
  };
  
  setupPlayer();
  
  return () => {
    TrackPlayer.reset();
  };
};

export default useAudioStore;
