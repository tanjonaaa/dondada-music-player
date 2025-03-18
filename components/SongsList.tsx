import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/songItem/SongItem";
import {useTheme} from "@react-navigation/native";
import {memo, useCallback, useMemo} from 'react';
import useAudioStore from "@/stores/useAudioStore";

const LoadingView = memo(({color}: { color: string }) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color}/>
    </View>
));

const EmptyView = memo(({colors, fonts}: { colors: any, fonts: any }) => (
    <View style={styles.emptyContainer}>
        <Text style={[
            styles.emptyText,
            {color: colors.text, fontFamily: fonts.medium.fontFamily}
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

const formatIndex = (index: number) => (index + 1).toString().padStart(2, '0');

const SongsList = memo(({songs, loading}: { songs: Song[], loading: boolean }) => {
    const {colors, fonts} = useTheme();
    const {addSongToQueue} = useAudioStore();

    const renderItem = useCallback(({item, index}: { item: Song, index: number }) => (
        <SongItem song={item} index={formatIndex(index)}/>
    ), [colors, fonts, addSongToQueue]);

    const keyExtractor = useCallback((item: Song) => item.id ?? '', []);

    const renderEmptyComponent = useMemo(() => (
        <EmptyView colors={colors} fonts={fonts}/>
    ), [colors, fonts]);

    if (loading) {
        return <LoadingView color={colors.primary}/>;
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
        marginBottom: 60,
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
});
