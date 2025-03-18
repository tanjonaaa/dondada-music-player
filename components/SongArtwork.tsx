import React, { useState } from 'react';
import { Image } from 'expo-image';
import { StyleSheet, ImageStyle, StyleProp } from 'react-native';
import { unknownTrackImageUri } from '@/types/song';

interface SongArtworkProps {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

const SongArtwork: React.FC<SongArtworkProps> = ({ uri, style }) => {
    const [source, setSource] = useState<string>(uri);

    return (
        <Image
            style={[defaultStyles.artwork, style]}
            source={source}
            onError={() => setSource(unknownTrackImageUri)}
        />
    );
};

const defaultStyles = StyleSheet.create({
    artwork: {
        resizeMode: 'cover',
    },
});

export default SongArtwork;
