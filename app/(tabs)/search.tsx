import { useState, useCallback } from 'react';
import { Text, View, TextInput, FlatList, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { debounce } from 'lodash';
import { useSongs } from '@/hooks/useSongs';
import { useAudio } from '@/contexts/AudioContext';
import { styles } from '@/styles/search.styles';
import { Ionicons } from '@expo/vector-icons';
import MusicPlayer from '@/components/MusicPlayer';
import { Song } from '@/types/song';

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const { songs, loading } = useSongs();
    const { colors, fonts } = useTheme();
    const { currentSong, isPlaying, playSound, togglePlayPause } = useAudio();

    const filterSongs = useCallback(
        debounce((query: string) => {
            const normalizedQuery = query.toLowerCase().trim();
            const filtered = songs.filter(song => 
                song.title.toLowerCase().includes(normalizedQuery) ||
                song.artist.toLowerCase().includes(normalizedQuery) ||
                (song.album?.toLowerCase().includes(normalizedQuery)) ||
                (song.genre?.toLowerCase().includes(normalizedQuery))
            );
            setFilteredSongs(filtered);
        }, 300),
        [songs]
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        filterSongs(text);
    };

    const renderSongItem = ({ item }: { item: Song }) => (
        <TouchableOpacity
            style={[
                styles.songItem,
                isPlaying && currentSong?.id === item.id && styles.playingSong
            ]}
            onPress={() => playSound(item)}
        >
            {item.artwork ? (
                <Image 
                    source={{ uri: item.artwork }} 
                    style={styles.artwork}
                />
            ) : (
                <View style={styles.artworkPlaceholder}>
                    <Ionicons name="musical-note" size={24} color={colors.text} />
                </View>
            )}
            <View style={styles.songInfo}>
                <Text style={[
                    styles.songTitle,
                    { color: colors.text, fontFamily: fonts.heavy.fontFamily }
                ]}>
                    {item.title}
                </Text>
                <Text style={[
                    styles.songArtist,
                    { color: colors.text, fontFamily: fonts.regular.fontFamily }
                ]}>
                    {item.artist} {item.album ? `• ${item.album}` : ''}
                </Text>
            </View>
            <Text style={[
                styles.duration,
                { color: colors.text, fontFamily: fonts.regular.fontFamily }
            ]}>
                {item.duration}
            </Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
                <Ionicons 
                    name="search" 
                    size={20} 
                    color={colors.text} 
                    style={styles.searchIcon}
                />
                <TextInput
                    style={[
                        styles.searchInput, 
                        { color: colors.text, paddingLeft: 40 }
                    ]}
                    placeholder="search"
                    placeholderTextColor={colors.text}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {searchQuery.trim() ? (
                <FlatList
                    data={filteredSongs}
                    renderItem={renderSongItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    keyboardShouldPersistTaps="handled"
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={[
                                styles.emptyText,
                                { color: colors.text, fontFamily: fonts.medium.fontFamily }
                            ]}>
                                No results found
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={[
                        styles.emptyText,
                        { color: colors.text, fontFamily: fonts.medium.fontFamily }
                    ]}>
                        No recent searches
                    </Text>
                </View>
            )}

            {currentSong && (
                <MusicPlayer 
                    currentSong={currentSong} 
                    isPlaying={isPlaying} 
                    togglePlayPause={togglePlayPause}
                />
            )}
        </View>
    );
}
