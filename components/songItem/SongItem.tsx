import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import useAudioStore from "@/stores/useAudioStore";
import {useTheme} from "@react-navigation/core";
import {useCallback, memo, useMemo} from "react";
import SongMetadata from "@/components/songItem/SongMetadata";

const SongItemComponent = ({song, index}: { song: Song, index: string }) => {
    const {playSong, currentSong} = useAudioStore();
    const {colors, fonts} = useTheme();

    const isCurrentSong = useMemo(() =>
            currentSong?.uri === song.uri,
        [currentSong?.uri, song.uri]
    );

    const handlePress = useCallback(async () => {
        if (isCurrentSong) return;

        try {
            playSong(song);
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
            activeOpacity={0.7}
        >
            <Text style={{
                marginVertical: 'auto',
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
                width: '8%',
                textAlign: 'center',
            }}>{index}</Text>
            <SongMetadata song={song} isLoading={false}/>
        </TouchableOpacity>
    );
};

const SongItem = memo(SongItemComponent);

export default SongItem;

const localStyles = StyleSheet.create({
    currentSongItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
});
