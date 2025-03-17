import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import usePlaylistStore from '@/stores/usePlaylistStore';
import CreatePlaylistModal from '@/components/CreatePlaylistModal';
import { useMediaLibrary } from '@/hooks/useMediaLibrary';
import { mapAssetToSong } from '@/types/song';
import { Playlist } from '@/types/playlist';
import PlaylistDetails from '@/components/PlaylistDetails';
import GlobalMusicPlayer from '@/components/GlobalMusicPlayer';

export default function Playlists() {
    const [modalVisible, setModalVisible] = useState(false);
    const { colors, fonts } = useTheme();
    const { playlists, loading, loadPlaylists } = usePlaylistStore();
    const { assets } = useMediaLibrary();
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    
    useEffect(() => {
        loadPlaylists();
    }, []);

    const songs = assets.map(mapAssetToSong);

    const renderPlaylist = ({ item }: { item: Playlist }) => {
        const playlistArtwork = item.songs[0]?.artwork || null;
        
        return (
            <View style={[styles.playlistCard, { backgroundColor: colors.card }]}>
                {playlistArtwork ? (
                    <Image 
                        source={{ uri: playlistArtwork }} 
                        style={styles.playlistArtwork}
                    />
                ) : (
                    <View style={[styles.playlistArtworkPlaceholder, { backgroundColor: colors.border }]}>
                        <MaterialIcons name="music-note" size={40} color={colors.text} />
                    </View>
                )}
                <Pressable
                    style={styles.playlistContent}
                    onPress={() => setSelectedPlaylist(item)}
                >
                    <Text style={[styles.playlistName, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.songCount, { color: colors.text }]}>
                        {item.songs.length} tracks
                    </Text>
                </Pressable>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <GlobalMusicPlayer />
            <Pressable
                style={[styles.addButton, { 
                    backgroundColor: colors.primary,
                }]}
                onPress={() => setModalVisible(true)}
            >
                <MaterialIcons 
                    name="add" 
                    size={24} 
                    color={colors.background}
                />
                <Text style={[styles.addButtonText, { 
                    color: colors.background
                }]}>New Playlist</Text>
            </Pressable>

            <FlatList
                data={playlists}
                renderItem={renderPlaylist}
                keyExtractor={item => item.id}
                style={styles.list}
            />

            <CreatePlaylistModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                availableSongs={songs}
            />

            <PlaylistDetails
                playlist={selectedPlaylist}
                visible={!!selectedPlaylist}
                onClose={() => setSelectedPlaylist(null)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 25,
        marginBottom: 16,
        marginHorizontal: 8,
    },
    addButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    list: {
        flex: 1,
    },
    playlistCard: {
        flexDirection: 'row',
        marginHorizontal: 8,
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    playlistArtwork: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    playlistArtworkPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playlistContent: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    playlistName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    songCount: {
        fontSize: 14,
        opacity: 0.7,
    },
});
