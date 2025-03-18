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
            source={{ uri: source }}
            style={[defaultStyles.artwork, style]}
            key={uri}
            onError={() => setSource(unknownTrackImageUri)}
        />
    );
};

const defaultStyles = StyleSheet.create({
    artwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
});

export default React.memo(SongArtwork);
