import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

let isPlayerInitialized = false;

const setupPlayer = async () => {
    if (isPlayerInitialized) {
        return;
    }

    try {
        await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 10,
        })

        await TrackPlayer.updateOptions({
            ratingType: RatingType.Heart,
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
                Capability.Stop,
                Capability.SeekTo
            ],
        })

        await TrackPlayer.setVolume(0.3) // not too loud
        await TrackPlayer.setRepeatMode(RepeatMode.Queue)
        
        isPlayerInitialized = true;
    } catch (error) {
        console.error("Erreur lors de l'initialisation du lecteur:", error);
        isPlayerInitialized = false;
    }
}

export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
    const isInitialized = useRef(false)

    useEffect(() => {
        if (isInitialized.current) return

        setupPlayer()
            .then(() => {
                isInitialized.current = true
                onLoad?.()
            })
            .catch((error) => {
                isInitialized.current = false
                console.error(error)
            })
            
        // Nettoyage lors du démontage du composant
        return () => {
            if (isPlayerInitialized) {
                TrackPlayer.reset();
            }
        };
    }, [onLoad])
}