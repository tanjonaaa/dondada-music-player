import {Song, unknownTrackImageUri} from "@/types/song";
import {StyleSheet, Text, View} from "react-native";
import {Image} from 'expo-image';
import {useTheme} from "@react-navigation/core";
import SongDetailsHeader from "@/components/songDetails/SongDetailsHeader";
import uri from "ajv/lib/runtime/uri";
import SongDetailsArtwork from "@/components/songDetails/SongDetailsArtwork";
import SongControl from "@/components/songDetails/songControl/SongControl";

export function SongDetails({song}: { song: Song }) {
    const {colors, fonts} = useTheme();

    return (
        <View style={[localStyles.container, {backgroundColor: colors.background}]}>
            <SongDetailsHeader/>
            <View style={localStyles.songMetadata}>
                <SongDetailsArtwork uri={song.artwork ?? unknownTrackImageUri} />
                <View>
                    <Text style={[localStyles.songTitle, {
                        fontFamily: fonts.bold.fontFamily,
                        color: colors.primary
                    }]} numberOfLines={2}>{song.title}</Text>
                    <Text style={[localStyles.songArtist, {
                        fontFamily: fonts.regular.fontFamily,
                        color: colors.text
                    }]}>{song.artist}</Text>
                </View>
                <SongControl />
            </View>
        </View>
    )
}

const localStyles = StyleSheet.create(
    {
        container: {
            height: "100%",
        },
        songMetadata: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            marginVertical: "10%",
            marginHorizontal: "5%",
            gap: 50,
        },
        songTitle: {
            textAlign: 'center',
            fontSize: 20,
        },
        songArtist: {
            textAlign: 'center',
            fontSize: 15,
        }
    }
);