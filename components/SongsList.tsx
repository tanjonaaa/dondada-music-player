import {ActivityIndicator, FlatList, StyleSheet, Text, View, Image} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/SongItem";
import {useTheme} from "@react-navigation/core";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SongsList({songs, loading}: { songs: Song[], loading: boolean }) {

    const {colors, fonts} = useTheme();

    const renderSongItem = ({item, index}: { item: Song, index: number }) => {
        return (
            <View style={styles.songItemContainer}>
                <Text style={{
                    marginVertical: 'auto',
                    marginLeft: 10,
                    color: colors.primary,
                    fontFamily: fonts.medium.fontFamily,
                    width: "8%"
                }}>{(index + 1).toString()}</Text>
                {item.artwork ? (
                    <Image source={{uri: item.artwork}} style={styles.artwork} />
                ) : (
                    <View style={[styles.artwork, styles.placeholderArtwork]}>
                        <MaterialIcons name="music-note" size={40} color={colors.text} />
                    </View>
                )}
                <SongItem song={item} />
            </View>
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
            keyExtractor={item => item.id ?? ''}
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
    songItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    artwork: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    placeholderArtwork: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
