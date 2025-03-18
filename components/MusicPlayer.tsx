import React, { useCallback, useEffect } from 'react';
import { Text, TouchableOpacity, useColorScheme, View, Image, ActivityIndicator } from "react-native";
import { styles } from "@/styles/index.styles";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import useSongStore from "@/stores/useSongStore";
import SongArtwork from "@/components/SongArtwork";
import { unknownTrackImageUri } from "@/types/song";

/**
 * Composant de lecteur de musique affichant les informations de la chanson en cours
 * et les contrôles de lecture
 */
const MusicPlayer: React.FC = React.memo(() => {
    const colorScheme = useColorScheme();
    const { colors, fonts } = useTheme();
    const { currentSong, togglePlayPause, isPlaying, isLoading, setPlayerVisibility } = useAudioStore();
    const { setSongToShow } = useSongStore();

    // Mettre à jour la visibilité du lecteur quand le composant est monté/démonté
    useEffect(() => {
        setPlayerVisibility(true);
        return () => setPlayerVisibility(false);
    }, [setPlayerVisibility]);

    // Calcul des styles basés sur le thème
    const songTitleColor = colorScheme === "dark" ? colors.primary : colors.background;
    const musicPlayerBgColor = colorScheme === "dark" ? "#2a2e42" : colors.primary;
    
    // Utilisation de useCallback pour les gestionnaires d'événements
    const handleSongPress = useCallback(() => {
        if (currentSong) {
            setSongToShow(currentSong);
        }
    }, [currentSong, setSongToShow]);
    
    const handlePlayPausePress = useCallback(() => {
        togglePlayPause();
    }, [togglePlayPause]);

    // Styles extraits pour améliorer la lisibilité
    const artworkStyle = {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        marginLeft: -40,
        marginTop: -6,
        borderWidth: 2,
        borderColor: colorScheme === "dark" ? "#ffffff20" : "#00000020"
    };
    
    const titleStyle = {
        color: songTitleColor,
        fontFamily: fonts.bold.fontFamily
    };
    
    const artistStyle = {
        color: colors.text,
        fontFamily: fonts.regular.fontFamily
    };

    return (
        <TouchableOpacity onPress={handleSongPress}>
            <View style={[styles.player, { backgroundColor: musicPlayerBgColor }]}>
                <SongArtwork
                    uri={currentSong?.artwork ?? unknownTrackImageUri}
                    style={artworkStyle}
                    key={currentSong?.uri ?? 'unknown'}
                />
                <View style={[styles.songMetadata, { flex: 1 }]}>
                    <Text 
                        style={[styles.currentTitle, titleStyle]}
                        numberOfLines={1}
                    >
                        {currentSong?.title}
                    </Text>
                    <Text style={artistStyle}>
                        {currentSong?.artist}
                    </Text>
                </View>
                
                {isLoading ? (
                    <ActivityIndicator size="small" color={colors.text} />
                ) : (
                    <TouchableOpacity onPress={handlePlayPausePress}>
                        <AntDesign
                            name={isPlaying ? "pause" : "play"}
                            size={24}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
});

// Définir un displayName pour faciliter le débogage
MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;