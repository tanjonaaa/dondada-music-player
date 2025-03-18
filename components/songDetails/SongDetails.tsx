import {Song, unknownTrackImageUri} from "@/types/song";
import {StyleSheet, Text, View} from "react-native";
import {useTheme} from "@react-navigation/core";
import SongDetailsHeader from "@/components/songDetails/SongDetailsHeader";
import SongControl from "@/components/songDetails/songControl/SongControl";
import SongArtwork from "@/components/SongArtwork";

export function SongDetails({song}: { song: Song }) {
    const {colors, fonts} = useTheme();

    return (
        <View style={[localStyles.container, {backgroundColor: colors.background}]}>
            <SongDetailsHeader/>
            <View style={localStyles.songMetadata}>
                <SongArtwork
                    key={song.id}
                    uri={song.artwork ?? unknownTrackImageUri}
                    style={{
                        height: '30%',
                        width: '70%',
                        marginHorizontal: 'auto',
                        borderRadius: 20,
                        shadowColor: '#000',
                        shadowOffset: {width: 0, height: 10},
                        shadowOpacity: 0.7,
                        shadowRadius: 20,
                    }}
                />
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
                <SongControl/>
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