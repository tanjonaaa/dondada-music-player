import React from 'react';
import { View } from 'react-native';
import useAudioStore from "@/stores/useAudioStore";
import MusicPlayer from "@/components/MusicPlayer";
import { Event, useTrackPlayerEvents } from "react-native-track-player";
import { mapTrackToSong } from "@/types/song";
import { styles } from '@/styles/index.styles';

export default function GlobalMusicPlayer() {
    const { currentSong, setCurrentSong } = useAudioStore();

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
            const song = mapTrackToSong(event.track);
            setCurrentSong(song);
        }
    });

    if (!currentSong) return null;

    return (
        <View style={styles.globalMusicPlayerContainer}>
            <MusicPlayer />
        </View>
    );
} 