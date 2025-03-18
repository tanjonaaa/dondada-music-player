import {memo, useCallback, useState} from "react";
import {Song, unknownTrackImageUri} from "@/types/song";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import {StyleSheet, Text, useColorScheme, View, ActivityIndicator} from "react-native";
import * as Haptics from "expo-haptics";
import {styles} from "@/styles/index.styles";
import SongArtwork from "@/components/SongArtwork";
import QueueButton from "@/components/songItem/QueueButton";

const SongMetadataComponent = memo(({song, isLoading}: { song: Song, isLoading: boolean }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipMessage, setTooltipMessage] = useState<string>();
    const {colors, fonts} = useTheme();
    const {addSongToQueue, removeSongFromQueue} = useAudioStore();
    const colorScheme = useColorScheme();
    const tooltipBgColor = colorScheme === 'dark' ? "#2a2e42" : colors.primary;

    const handleAddToQueue = useCallback(async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const message = await addSongToQueue([song]);
            setTooltipMessage(message[0]);
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 1000);
        } catch (error) {
            console.error("Erreur lors de l'ajout à la file d'attente:", error);
        }
    }, [song, addSongToQueue]);

    const handleRemoveFromQueue = useCallback(async () => {
        try {
            await removeSongFromQueue(song.id!);
        } catch (error) {
            console.error("Erreur lors de l'ajout à la file d'attente:", error);
        }
    }, [song, addSongToQueue]);

    return (
        <View style={localStyles.songItemContent}>
            <SongArtwork
                uri={song.artwork ?? unknownTrackImageUri}
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: 4,
                    marginRight: 10,
                }}
            />
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
            <QueueButton
                handleAddToQueue={handleAddToQueue}
                handleRemoveFromQueue={handleRemoveFromQueue}
                isLoading={isLoading}
                tooltipVisible={tooltipVisible}
                tooltipMessage={tooltipMessage}
            />
        </View>
    );
});

const SongMetadata = memo(SongMetadataComponent);

export default SongMetadata;

const localStyles = StyleSheet.create({
    songItemContent: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
    songMetadata: {
        width: "75%"
    },
    tooltip: {
        position: 'absolute',
        top: 20,
        padding: 5,
        borderRadius: 3,
        alignSelf: 'center',
        width: 150,
    },
    queueIcon: {
        width: "20%"
    },
    loadingOverlay: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: [{translateY: -12}],
        zIndex: 2,
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

