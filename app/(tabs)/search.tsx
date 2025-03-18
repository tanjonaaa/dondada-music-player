import {useState, useCallback} from 'react';
import {Text, View, TextInput, TouchableOpacity, ActivityIndicator} from "react-native";
import {useTheme} from "@react-navigation/native";
import {debounce} from 'lodash';
import {useSongs} from '@/hooks/useSongs';
import {styles} from '@/styles/search.styles';
import {Ionicons} from '@expo/vector-icons';
import {Song} from '@/types/song';
import SongsList from "@/components/SongsList";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";

export default function SearchScreen() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const {songs, loading} = useSongs();
    const {colors, fonts} = useTheme();

    const filterSongs = useCallback(
        debounce((query: string) => {
            const normalizedQuery = query.toLowerCase().trim();
            const filtered = songs.filter(song =>
                (song.title && song.title.toLowerCase().includes(normalizedQuery)) ||
                (song.artist && song.artist.toLowerCase().includes(normalizedQuery))
            );
            setFilteredSongs(filtered);
        }, 300),
        [songs]
    );

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        filterSongs(text);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={[styles.searchContainer, {backgroundColor: colors.card}]}>
                <Ionicons
                    name="search"
                    size={20}
                    color={colors.text}
                    style={styles.searchIcon}
                />
                <TextInput
                    style={[
                        styles.searchInput,
                        {color: colors.text, paddingLeft: 40}
                    ]}
                    placeholder="search"
                    placeholderTextColor={colors.text}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            <View style={styles.musicPlayerContainer}>
                <GlobalMusicPlayer />
            </View>

            <View style={styles.songsListContainer}>
                {searchQuery.trim() ? (
                    <SongsList songs={filteredSongs} loading={loading}/>
                ) : (
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        paddingTop: 40,
                    }}>
                        <Text style={
                            {
                                color: colors.text,
                                fontFamily: fonts.medium.fontFamily,
                                fontSize: 16,
                                textAlign: 'center',
                            }
                        }>
                            No recent searches
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}
