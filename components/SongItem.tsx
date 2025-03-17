import {Pressable, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ActivityIndicator} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import useAudioStore from "@/stores/useAudioStore";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {useTheme} from "@react-navigation/core";
import {useState, useCallback, memo} from "react";
import * as Haptics from 'expo-haptics';

const SongMetadata = memo(({song, isLoading}: { song: Song, isLoading: boolean }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {colors, fonts} = useTheme();
    const {addSongToQueue} = useAudioStore();
    const colorScheme = useColorScheme();
    const tooltipBgColor = colorScheme === 'dark' ? "#2a2e42" : colors.primary;

    const handleAddToQueue = useCallback(async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            await addSongToQueue(song);
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 1000);
        } catch (error) {
            console.error("Erreur lors de l'ajout à la file d'attente:", error);
        }
    }, [song, addSongToQueue]);

    return (
        <View style={localStyles.songItemContent}>
            <View style={localStyles.songMetadata}>
                <Text style={{
                    color: colors.primary,
                    fontFamily: fonts.heavy.fontFamily,
                    opacity: isLoading ? 0.5 : 1,
                }} numberOfLines={1}>{song.title}</Text>
                <Text style={[styles.songArtist, {
                    color: colors.text,
                    fontFamily: fonts.regular.fontFamily,
                    opacity: isLoading ? 0.5 : 1,
                }]}>{song.artist} - {song.formattedDuration}</Text>
            </View>
            <Pressable 
                onPress={handleAddToQueue}
                disabled={isLoading}
                style={({pressed}) => [
                    localStyles.queueIcon,
                    {opacity: pressed || isLoading ? 0.5 : 1}
                ]}
            >
                <MaterialIcons 
                    name="queue-music" 
                    color={colors.primary} 
                    size={25} 
                    style={{marginHorizontal: 'auto'}}
                />
                {tooltipVisible && (
                    <View style={[localStyles.tooltip, {backgroundColor: tooltipBgColor}]}>
                        <Text style={{color: colors.text, fontFamily: fonts.regular.fontFamily}}>
                            Ajouté à la file
                        </Text>
                    </View>
                )}
            </Pressable>
        </View>
    );
});

const SongItemComponent = ({song, index}: { song: Song, index: string }) => {
    const {colors, fonts} = useTheme();
    const {playSong, currentSong} = useAudioStore();
    
    const isCurrentSong = currentSong?.uri === song.uri;

    const handlePress = useCallback(async () => {
        if (isCurrentSong) return;
        
        try {
            await Promise.all([
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
                playSong(song)
            ]);
        } catch (error) {
            console.error("Erreur lors de la lecture:", error);
        }
    }, [song, isCurrentSong, playSong]);

    return (
        <TouchableOpacity
            style={[
                styles.songItem,
                isCurrentSong && localStyles.currentSongItem
            ]}
            onPress={handlePress}
        >
            <Text style={{
                marginVertical: 'auto',
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
                width: "8%"
            }}>{index}</Text>
            <SongMetadata song={song} isLoading={false} />
        </TouchableOpacity>
    );
};

const SongItem = memo(SongItemComponent);

export default SongItem;

const localStyles = StyleSheet.create({
    songItemContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    songMetadata: {
        width: "80%"
    },
    tooltip: {
        position: 'absolute',
        top: 20,
        padding: 5,
        borderRadius: 3,
        alignSelf: 'center',
    },
    queueIcon: {
        width: '50%'
    },
    currentSongItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    loadingOverlay: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{translateY: -12}],
        zIndex: 2,
    }
});
