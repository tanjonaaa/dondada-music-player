import React, { useCallback } from 'react';
import { View } from 'react-native';
import useAudioStore from "@/stores/useAudioStore";
import MusicPlayer from "@/components/MusicPlayer";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { mapTrackToSong } from "@/types/song";
import { styles } from '@/styles/index.styles';

const GlobalMusicPlayer: React.FC = React.memo(() => {
    const { currentSong, setCurrentSong, isLoading } = useAudioStore();

    const handleTrackChange = useCallback(async (event: any) => {
        if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
            const song = mapTrackToSong(event.track);
            setCurrentSong(song);
        }
    }, [setCurrentSong]);

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], handleTrackChange);

    if (!currentSong) return null;

    return (
        <View style={styles.globalMusicPlayerContainer}>
            <MusicPlayer />
        </View>
    );
});

export default GlobalMusicPlayer; 