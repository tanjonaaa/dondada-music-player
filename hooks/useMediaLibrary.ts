import { useState, useEffect } from 'react';
import * as MusicLibrary from 'expo-music-library';

export const useMediaLibrary = () => {
    const [assets, setAssets] = useState<MusicLibrary.Asset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const { status } = await MusicLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const media = await MusicLibrary.getAssetsAsync({
                    first: 100000,
                });
                setAssets(media.assets);
            }
            setLoading(false);
        })();
    }, []);

    return { assets, loading };
}; 