import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Song } from '@/types/song';

export const useAudioPlayer = () => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async (song: Song) => {
        try {
            if (sound) {
                await sound.unloadAsync();
            }

            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri: song.uri },
                { shouldPlay: true },
                (status) => {
                    if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
                        setIsPlaying(false);
                    }
                }
            );

            await newSound.setStatusAsync({
                progressUpdateIntervalMillis: 1000,
                positionMillis: 0,
                shouldPlay: true,
                rate: 1.0,
                shouldCorrectPitch: true,
            });

            setSound(newSound);
            setCurrentSong(song);
            setIsPlaying(true);
        } catch (error) {
            console.error('Erreur lors de la lecture:', error);
        }
    };

    const togglePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    return {
        sound,
        currentSong,
        isPlaying,
        playSound,
        togglePlayPause
    };
}; 