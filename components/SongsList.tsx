import {ActivityIndicator, FlatList, StyleSheet, Text, View, Animated} from "react-native";
import {Song} from "@/types/song";
import SongItem from "@/components/songItem/SongItem";
import {useTheme} from "@react-navigation/native";
import {memo, useCallback, useMemo, useRef, useEffect} from 'react';
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
const PlayingIndicator = memo(({color}: {color: string}) => {
    const animations = [
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current,
        useRef(new Animated.Value(0)).current
    ];

    useEffect(() => {
        // Fonction pour animer une barre
        const animateBar = (barAnim: Animated.Value, delay: number) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(barAnim, {
                        toValue: 1,
                        duration: 500,
                        delay,
                        useNativeDriver: true
                    }),
                    Animated.timing(barAnim, {
                        toValue: 0,
                        duration: 500,
                        useNativeDriver: true
                    })
                ])
            ).start();
        };

        // Animer les trois barres avec des délais différents
        animateBar(animations[0], 0);
        animateBar(animations[1], 200);
        animateBar(animations[2], 400);

        return () => {
            animations.forEach(anim => anim.stopAnimation());
        };
    }, []);

    return (
        <View style={styles.playingIndicator}>
            {animations.map((anim, index) => (
                <Animated.View 
                    key={index}
                    style={[
                        styles.bar,
                        {
                            backgroundColor: color,
                            transform: [{
                                scaleY: anim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.4, 1]
                                })
                            }]
                        }
                    ]}
                />
            ))}
        </View>
    );
});

// Utiliser React.memo avec une fonction de comparaison personnalisée pour SongItem
const MemoizedSongItem = memo(({song, index, isPlaying, playingIndicator}: {
    song: Song,
    index: string,
    isPlaying: boolean,
    playingIndicator: React.ReactNode | null
}) => (
    <SongItem 
        song={song} 
        index={index}
        isPlaying={isPlaying}
        playingIndicator={playingIndicator}
    />
), (prevProps, nextProps) => {
    return prevProps.song.id === nextProps.song.id &&
           prevProps.isPlaying === nextProps.isPlaying &&
           prevProps.index === nextProps.index;
});

const SongsList = memo(({songs, loading}: { songs: Song[], loading: boolean }) => {
    const {colors, fonts} = useTheme();
    const { currentSong, isPlaying } = useAudioStore();
    
    const playingIndicatorMemo = useMemo(() => <PlayingIndicator color="white" />, []);

    const renderItem = useCallback(({item, index}: { item: Song, index: number }) => {
        const isCurrentlyPlaying = currentSong?.uri === item.uri && isPlaying;
        const formattedIndex = formatIndex(index);
        
        return (
            <MemoizedSongItem 
                song={item} 
                index={formattedIndex}
                isPlaying={isCurrentlyPlaying}
                playingIndicator={isCurrentlyPlaying ? playingIndicatorMemo : null}
            />
        );
    }, [currentSong?.uri, isPlaying, playingIndicatorMemo]);

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
    playingIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 4,
        width: 50,
        height: 50,
    },
    bar: {
        width: 3,
        height: 12,
        borderRadius: 1.5,
        marginHorizontal: 1,
    },
    songItemWrapper: {
        position: 'relative',
    },
});
