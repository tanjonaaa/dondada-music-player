import React, { memo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Song } from '@/types/song';

interface Props {
    songs: Song[];
    selectedSongs: Set<string>;
    onToggleSelection: (songId: string) => void;
}

const SelectableSongsList = memo(({ songs, selectedSongs, onToggleSelection }: Props) => {
    const { colors, fonts } = useTheme();

    const renderItem = useCallback(({ item, index }: { item: Song, index: number }) => (
        <Pressable
            onPress={() => item.id && onToggleSelection(item.id)}
            style={[
                styles.songItem,
                { borderBottomColor: colors.border }
            ]}
        >
            <MaterialIcons
                name={selectedSongs.has(item.id || '') ? "check-box" : "check-box-outline-blank"}
                size={24}
                color={colors.primary}
                style={styles.checkbox}
            />
            
            {item.artwork ? (
                <Image source={{ uri: item.artwork }} style={styles.artwork} />
            ) : (
                <View style={[styles.artwork, styles.placeholderArtwork]}>
                    <MaterialIcons name="music-note" size={24} color={colors.text} />
                </View>
            )}
            
            <View style={styles.songInfo}>
                <Text style={[styles.songTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.title || 'Sans titre'}
                </Text>
                <Text style={[styles.songArtist, { color: colors.text }]} numberOfLines={1}>
                    {item.artist || 'Artiste inconnu'}
                </Text>
            </View>
        </Pressable>
    ), [colors, selectedSongs, onToggleSelection]);

    return (
        <FlatList
            data={songs}
            renderItem={renderItem}
            keyExtractor={item => item.id || ''}
            style={styles.list}
            showsVerticalScrollIndicator={false}
        />
    );
});

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
    },
    checkbox: {
        marginRight: 12,
    },
    artwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 12,
    },
    placeholderArtwork: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    songInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    songArtist: {
        fontSize: 14,
        opacity: 0.7,
        marginTop: 4,
    },
});

export default SelectableSongsList; 