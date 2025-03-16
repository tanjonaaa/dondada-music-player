import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Song } from '@/types/song';

interface MusicListItemProps {
    song: Song;
    onPress?: (song: Song) => void;
    isPlaying?: boolean;
}

const MusicListItem: React.FC<MusicListItemProps> = ({ song, onPress, isPlaying }) => {
    const { colors, fonts } = useTheme();

    return (
        <TouchableOpacity
            style={[
                styles.container,
                isPlaying && { backgroundColor: colors.card }
            ]}
            onPress={() => onPress?.(song)}
        >
            <View>
                <Text style={[
                    styles.title,
                    { 
                        color: isPlaying ? colors.primary : colors.text,
                        fontFamily: fonts.heavy.fontFamily 
                    }
                ]}>
                    {song.title}
                </Text>
                <Text style={[
                    styles.artist,
                    { color: colors.text, fontFamily: fonts.regular.fontFamily }
                ]}>
                    {song.artist} - {song.duration}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    title: {
        fontSize: 16,
        marginBottom: 4,
    },
    artist: {
        fontSize: 14,
    },
});

export default MusicListItem; 