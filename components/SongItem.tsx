import {Text, TouchableOpacity} from "react-native";
import {styles} from "@/styles/index.styles";
import {Song} from "@/types/song";
import useAudioStore from "@/stores/useAudioStore";
import SongMetadata from "@/components/SongMetadata";

export default function SongItem({song}: { song: Song }) {
    const {playSong} = useAudioStore();

    return (
        <TouchableOpacity
            style={styles.songItem}
            onPress={() => playSong(song)}
        >
            <SongMetadata song={song}/>
        </TouchableOpacity>
    );
}
