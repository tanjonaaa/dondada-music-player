import React, { useState } from 'react';
import { Modal, View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Song } from '@/types/song';
import SelectableSongsList from './SelectableSongsList';
import usePlaylistStore from '@/stores/usePlaylistStore';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    visible: boolean;
    onClose: () => void;
    availableSongs: Song[];
}

export default function CreatePlaylistModal({ visible, onClose, availableSongs }: Props) {
    const [step, setStep] = useState(1);
    const [playlistName, setPlaylistName] = useState('');
    const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());
    const { colors, fonts } = useTheme();
    const { addPlaylist } = usePlaylistStore();

    const handleNext = () => {
        if (playlistName.trim()) {
            setStep(2);
        }
    };

    const handleSave = async () => {
        const songs = availableSongs.filter(song => selectedSongs.has(song.id || ''));
        await addPlaylist(playlistName, songs);
        setPlaylistName('');
        setSelectedSongs(new Set());
        setStep(1);
        onClose();
    };

    const toggleSongSelection = (songId: string) => {
        const newSelection = new Set(selectedSongs);
        if (newSelection.has(songId)) {
            newSelection.delete(songId);
        } else {
            newSelection.add(songId);
        }
        setSelectedSongs(newSelection);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {step === 1 ? (
                    <View style={styles.content}>
                        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.medium.fontFamily }]}>
                            New Playlist
                        </Text>
                        <TextInput
                            style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                            placeholder="Playlist name"
                            placeholderTextColor={colors.text}
                            value={playlistName}
                            onChangeText={setPlaylistName}
                        />
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.primary }]}
                                onPress={handleNext}
                            >
                                <View style={styles.buttonContent}>
                                    <AntDesign name="arrowright" size={20} color={colors.background} style={styles.buttonIcon} />
                                    <Text style={[styles.buttonText, { color: colors.background }]}>Next</Text>
                                </View>
                            </Pressable>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.border }]}
                                onPress={onClose}
                            >
                                <Text style={[styles.buttonText, { color: colors.background }]}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View style={[styles.content, { flex: 1 }]}>
                        <Text style={[styles.title, { color: colors.text, fontFamily: fonts.medium.fontFamily }]}>
                            Select songs
                        </Text>
                        <View style={{ flex: 1 }}>
                            <SelectableSongsList
                                songs={availableSongs}
                                selectedSongs={selectedSongs}
                                onToggleSelection={toggleSongSelection}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.primary }]}
                                onPress={handleSave}
                            >
                                <Text style={[styles.buttonText, { color: colors.background }]}>Save</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, { backgroundColor: colors.border }]}
                                onPress={() => setStep(1)}
                            >
                                <Text style={[styles.buttonText, { color: colors.background }]}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 16,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonIcon: {
        marginRight: 8,
    },
}); 