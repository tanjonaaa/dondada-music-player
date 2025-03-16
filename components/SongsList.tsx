import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/SongItem";
import {useTheme} from "@react-navigation/core";

export default function SongsList({songs, loading}: { songs: Song[], loading: boolean }) {

    const {colors, fonts} = useTheme();

    const renderSongItem = ({item, index}: { item: Song, index: number }) => {
        const formattedIndex = (index + 1).toString().padStart(2, '0');

        return (
            <SongItem song={item} index={formattedIndex}/>
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary}/>
            </View>
        );
    }

    return (
        <FlatList
            data={songs}
            renderItem={renderSongItem}
            keyExtractor={item => item.id}
            style={styles.list}
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
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});
