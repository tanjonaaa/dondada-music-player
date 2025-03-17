import {ActivityIndicator, FlatList, StyleSheet, Text, View, Image, Pressable} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/SongItem";
import {useTheme} from "@react-navigation/native";
import {memo, useCallback, useMemo} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAudioStore from "@/stores/useAudioStore";

const LoadingView = memo(({color}: {color: string}) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color}/>
    </View>
));

const EmptyView = memo(({colors, fonts}: {colors: any, fonts: any}) => (
    <View style={styles.emptyContainer}>
        <Text style={[
            styles.emptyText,
            { color: colors.text, fontFamily: fonts.medium.fontFamily }
        ]}>
            No results found
        </Text>
    </View>
));

const getItemLayout = (_: any, index: number) => ({
    length: 72, 
    offset: 72 * index,
    index,
});

const SongsList = memo(({songs, loading}: { songs: Song[], loading: boolean }) => {
    const {colors, fonts} = useTheme();
    const {addSongToQueue} = useAudioStore();

    const renderItem = useCallback(({item, index}: {item: Song, index: number}) => (
        <View style={styles.songItemContainer}>
            <Text style={{
                marginVertical: 'auto',
                marginLeft: 10,
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
                width: "8%"
            }}>{(index + 1).toString().padStart(2, '0')}</Text>
            {item.artwork ? (
                <Image source={{uri: item.artwork}} style={styles.artwork} />
            ) : (
                <View style={[styles.artwork, styles.placeholderArtwork]}>
                    <MaterialIcons name="music-note" size={40} color={colors.text} />
                </View>
            )}
            <SongItem song={item} />
            <Pressable 
                onPress={() => addSongToQueue(item)}
                style={({pressed}) => ({opacity: pressed ? 0.5 : 1})}
            >
                <MaterialIcons 
                    name="queue-music" 
                    color={colors.primary} 
                    size={25} 
                    style={{marginRight: 10}}
                />
            </Pressable>
        </View>
    ), [colors, fonts, addSongToQueue]);

    const keyExtractor = useCallback((item: Song) => item.id ?? '', []);

    const renderEmptyComponent = useMemo(() => (
        <EmptyView colors={colors} fonts={fonts}/>
    ), [colors, fonts]);

    if (loading) {
        return <LoadingView color={colors.primary} />;
    }

    return (
        <FlatList
            data={songs}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={styles.list}
            ListEmptyComponent={renderEmptyComponent}
            removeClippedSubviews={true}
            maxToRenderPerBatch={5}
            windowSize={3}
            initialNumToRender={8}
            getItemLayout={getItemLayout}
            updateCellsBatchingPeriod={50}
            showsVerticalScrollIndicator={false}
        />
    );
});

export default SongsList;

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
        paddingVertical: 8,
    },
    artwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 10,
    },
    placeholderArtwork: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
