import { create } from 'zustand';
import { Playlist } from '@/types/playlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Song } from '@/types/song';

interface PlaylistStore {
    playlists: Playlist[];
    loading: boolean;
    addPlaylist: (name: string, songs: Song[]) => Promise<void>;
    loadPlaylists: () => Promise<void>;
    deletePlaylist: (id: string) => Promise<void>;
}

const STORAGE_KEY = '@playlists';

const usePlaylistStore = create<PlaylistStore>((set, get) => ({
    playlists: [],
    loading: true,
    
    addPlaylist: async (name: string, songs: Song[]) => {
        const newPlaylist: Playlist = {
            id: Date.now().toString(),
            name,
            songs,
            createdAt: Date.now(),
        };
        
        const updatedPlaylists = [...get().playlists, newPlaylist];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlaylists));
        set({ playlists: updatedPlaylists });
    },
    
    loadPlaylists: async () => {
        try {
            const stored = await AsyncStorage.getItem(STORAGE_KEY);
            const playlists = stored ? JSON.parse(stored) : [];
            set({ playlists, loading: false });
        } catch (error) {
            console.error('Erreur lors du chargement des playlists:', error);
            set({ loading: false });
        }
    },
    
    deletePlaylist: async (id: string) => {
        const filteredPlaylists = get().playlists.filter(p => p.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPlaylists));
        set({ playlists: filteredPlaylists });
    },
}));

export default usePlaylistStore; 