import {useState} from "react";
import {Image} from "expo-image";
import {unknownTrackImageUri} from "@/types/song";
import {StyleSheet} from "react-native";

export default function SongDetailsArtwork({uri}: {uri: string}) {
    const [source, setSource] = useState<string>(uri);

    return (
        <Image style={localStyles.artwork} source={source} onError={() => setSource(unknownTrackImageUri)}/>
    )
}

const localStyles = StyleSheet.create({
    artwork: {
        height: '30%',
        width: '70%',
        marginHorizontal: 'auto',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.7,
        shadowRadius: 20,
        elevation: 20,
    },
})
