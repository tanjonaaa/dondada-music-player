import { useState, useEffect } from 'react';
import { 
    requestPermissionsAsync, 
    getAssetsAsync
} from 'expo-music-library';
import { Song, mapAssetToSong } from '@/types/song';

export const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = async () => {
        try {
            const { granted } = await requestPermissionsAsync();
            if (!granted) {
                setError('Permission refusée');
                return;
            }

            const assets = await getAssetsAsync({
                first: 2000,
                sortBy: ['creationTime']
            });

            const mappedSongs = assets.assets.map(mapAssetToSong);
            setSongs(mappedSongs);
        } catch (err) {
            console.error('Erreur lors du chargement des musiques:', err);
            setError('Erreur lors du chargement des musiques');
        } finally {
            setLoading(false);
        }
    };

    return { songs, loading, error, refreshSongs: loadSongs };
}; 