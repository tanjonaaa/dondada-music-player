import {Text, TouchableOpacity} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import {useTheme} from "@react-navigation/core";
import useAudioStore from "@/stores/useAudioStore";
import SongMetadata from "@/components/SongMetadata";

export default function SongItem({song, index}: { song: Song, index: string }) {
    const {colors, fonts} = useTheme();
    const {playSong} = useAudioStore();

    return (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() => playSong(song)}
        >
            <Text style={{
                marginVertical: 'auto',
                color: colors.primary,
                fontFamily: fonts.medium.fontFamily,
                width: "8%"
            }}>{index}</Text>
            <SongMetadata song={song}/>
        </TouchableOpacity>
    );
}
