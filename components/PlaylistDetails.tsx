import React, { memo } from 'react';
import { View, StyleSheet, Modal, Text, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import SongsList from './SongsList';
import { Playlist } from '@/types/playlist';
import useAudioStore from '@/stores/useAudioStore';

interface Props {
    playlist: Playlist | null;
    visible: boolean;
    onClose: () => void;
}

const PlaylistDetails = memo(({ playlist, visible, onClose }: Props) => {
    const { colors } = useTheme();
    const { playSong } = useAudioStore();

    const handlePlayPlaylist = () => {
        if (playlist?.songs.length) {
            playSong(playlist.songs[0]);
            // Ajouter les autres chansons à la queue
            playlist.songs.slice(1).forEach(song => {
                useAudioStore.getState().addSongToQueue(song);
            });
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <View style={styles.header}>
                    <Pressable onPress={onClose} style={styles.backButton}>
                        <MaterialIcons name="arrow-back" size={24} color={colors.text} />
                    </Pressable>
                    <Text style={[styles.title, { color: colors.text }]}>{playlist?.name}</Text>
                    <Pressable 
                        style={[styles.playButton, { backgroundColor: colors.primary }]}
                        onPress={handlePlayPlaylist}
                    >
                        <MaterialIcons name="play-arrow" size={32} color={colors.background} />
                    </Pressable>
                </View>
                <SongsList
                    songs={playlist?.songs || []}
                    loading={false}
                />
            </View>
        </Modal>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    backButton: {
        padding: 8,
    },
    title: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 8,
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },
});

export default PlaylistDetails; 