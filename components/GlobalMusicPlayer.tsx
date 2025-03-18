import React from 'react';
import { View } from 'react-native';
import { styles } from '@/styles/index.styles';
import MusicPlayer from '@/components/MusicPlayer';
import useSongStore from '@/stores/useSongStore';

const GlobalMusicPlayer: React.FC = () => {
    const { songToShow } = useSongStore();
    
    // Ne pas afficher le lecteur de musique si les détails de la chanson sont affichés
    if (songToShow) {
        return null;
    }
    
    return (
        <View style={styles.globalMusicPlayerContainer}>
            <MusicPlayer />
        </View>
    );
};

export default GlobalMusicPlayer; 