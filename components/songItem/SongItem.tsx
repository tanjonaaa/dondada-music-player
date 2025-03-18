import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import useAudioStore from "@/stores/useAudioStore";
import {useTheme} from "@react-navigation/core";
import {useCallback, memo} from "react";
import SongMetadata from "@/components/songItem/SongMetadata";

const SongItemComponent = memo(({song, index, playingIndicator}: { 
    song: Song, 
    index: string,
    isPlaying?: boolean,
    playingIndicator?: React.ReactNode
}) => {
    const {playSong, currentSong, isLoading} = useAudioStore();
    const {colors, fonts} = useTheme();

    const isCurrentSong = currentSong?.uri === song.uri;
    const isThisSongLoading = isLoading && isCurrentSong;

    const handlePress = useCallback(() => {
        playSong(song);
    }, [song.id]);

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
            <View style={localStyles.metadataContainer}>
                {playingIndicator}
                <SongMetadata song={song} isLoading={isThisSongLoading}/>
            </View>
        </TouchableOpacity>
    );
}, (prevProps, nextProps) => {
    return prevProps.song.id === nextProps.song.id &&
           prevProps.isPlaying === nextProps.isPlaying &&
           prevProps.index === nextProps.index &&
           (!prevProps.playingIndicator) === (!nextProps.playingIndicator);
});

const SongItem = SongItemComponent;

export default SongItem;

const localStyles = StyleSheet.create({
    currentSongItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    metadataContainer: {
        position: 'relative',
        flex: 1,
    }
});
