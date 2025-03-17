import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/SongItem";
import {useTheme} from "@react-navigation/native";
import {memo, useCallback} from 'react';

// Optimisation: Mémoriser le composant de chargement
const LoadingView = memo(({color}: {color: string}) => (
    <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={color}/>
    </View>
));

// Optimisation: Mémoriser le composant vide
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

const SongsList = memo(({songs, loading}: { songs: Song[], loading: boolean }) => {
    const {colors, fonts} = useTheme();

    // Optimisation: Mémoriser la fonction de rendu
    const renderItem = useCallback(({item, index}: {item: Song, index: number}) => (
        <SongItem song={item} index={(index + 1).toString().padStart(2, '0')}/>
    ), []);

    const keyExtractor = useCallback((item: Song) => item.id ?? '', []);

    const renderEmptyComponent = useCallback(() => (
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
            maxToRenderPerBatch={10}
            windowSize={5}
            initialNumToRender={10}
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
});
