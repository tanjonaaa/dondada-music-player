import {memo, useCallback, useState} from "react";
import {Song, unknownTrackImageUri} from "@/types/song";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import {Pressable, StyleSheet, Text, useColorScheme, View} from "react-native";
import * as Haptics from "expo-haptics";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {styles} from "@/styles/index.styles";
import SongArtwork from "@/components/SongArtwork";

const SongMetadataComponent = memo(({song, isLoading}: { song: Song, isLoading: boolean }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const {colors, fonts} = useTheme();
    const {addSongToQueue} = useAudioStore();
    const colorScheme = useColorScheme();
    const tooltipBgColor = colorScheme === 'dark' ? "#2a2e42" : colors.primary;

    const handleAddToQueue = useCallback(async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            await addSongToQueue([song]);
            setTooltipVisible(true);
            setTimeout(() => setTooltipVisible(false), 1000);
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

