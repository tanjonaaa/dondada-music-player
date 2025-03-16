import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Song } from '@/types/song';

interface AudioContextType {
    sound: Audio.Sound | null;
    currentSong: Song | null;
    isPlaying: boolean;
    playSound: (song: Song) => Promise<void>;
    togglePlayPause: () => Promise<void>;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const isLoadingRef = useRef(false);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, []);

    const stopAndUnloadSound = async () => {
        if (sound) {
            try {
                await sound.stopAsync();
                await sound.unloadAsync();
                setSound(null);
                setIsPlaying(false);
            } catch (error) {
                console.error('Erreur lors de l\'arrêt du son:', error);
            }
        }
    };

    const playSound = async (song: Song) => {
        try {
            // Empêcher les clics multiples pendant le chargement
            if (isLoadingRef.current) {
                return;
            }

            isLoadingRef.current = true;

            // Toujours arrêter et décharger l'audio précédent
            await stopAndUnloadSound();

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
        } finally {
            isLoadingRef.current = false;
        }
    };

    const togglePlayPause = async () => {
        if (sound) {
            try {
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    await sound.playAsync();
                }
                setIsPlaying(!isPlaying);
            } catch (error) {
                console.error('Erreur lors du toggle play/pause:', error);
            }
        }
    };

    return (
        <AudioContext.Provider value={{
            sound,
            currentSong,
            isPlaying,
            playSound,
            togglePlayPause
        }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
}; 