import {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import {styles} from '@/styles/index.styles';
import {mapAssetToSong, Song} from '@/types/song';
import MusicPlayer from "@/components/MusicPlayer";
import {useTheme} from "@react-navigation/core";
import TrackPlayer from "react-native-track-player";

export default function Index() {
    const [songs, setSongs] = useState<Song[]>([]);
    const [permission, setPermission] = useState<boolean>(false);
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const {colors, fonts} = useTheme();

    useEffect(() => {
        requestPermission();
        return () => {
            TrackPlayer.reset();
        };
    }, []);

    const requestPermission = async () => {
        const {status} = await MediaLibrary.requestPermissionsAsync();
        if (status === 'granted') {
            setPermission(true);
            await loadSongs();
        }
    };

    const loadSongs = async () => {
        try {
            // Récupérer toutes les musiques avec pagination
            let allMedia: MediaLibrary.Asset[] = [];
            let pageData = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.audio,
                first: 2000,
                sortBy: ['creationTime']
            });

            allMedia = [...pageData.assets];

            while (pageData.hasNextPage) {
                pageData = await MediaLibrary.getAssetsAsync({
                    mediaType: MediaLibrary.MediaType.audio,
                    first: 2000,
                    after: pageData.endCursor,
                    sortBy: ['creationTime']
                });
                allMedia = [...allMedia, ...pageData.assets];
            }

            // Filtrer les vrais fichiers audio
            const audioFiles = allMedia.filter(asset =>
                asset.filename.toLowerCase().endsWith('.mp3') ||
                asset.filename.toLowerCase().endsWith('.m4a') ||
                asset.filename.toLowerCase().endsWith('.wav') ||
                asset.filename.toLowerCase().endsWith('.aac')
            );

            const songs = audioFiles.map(asset => mapAssetToSong(asset));

            setSongs(songs);
        } catch (error) {
            console.error('Erreur lors du chargement des musiques:', error);
        }
    };

    const playSound = async (song: Song) => {
        await TrackPlayer.add([
            {
                url: song.uri
            }
        ]);

        await TrackPlayer.play()

        setIsPlaying(true);
        setCurrentSong(song);
    };

    const togglePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
    };

    const renderSongItem = ({item, index}: { item: Song, index: number }) => {
        const formattedIndex = (index + 1).toString().padStart(2, '0');

        return (
            <TouchableOpacity
                style={styles.songItem}
                onPress={() => playSound(item)}
            >
                <Text style={{
                    marginVertical: 'auto',
                    color: colors.primary,
                    fontFamily: fonts.medium.fontFamily,
                }}>{formattedIndex}</Text>
                <View>
                    <Text style={{
                        color: colors.primary,
                        fontFamily: fonts.heavy.fontFamily,
                    }}>{item.title}</Text>
                    <Text style={[styles.songArtist, {
                        color: colors.text,
                        fontFamily: fonts.regular.fontFamily
                    }]}>{item.artist} - {item.formattedDuration}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Veuillez autoriser l'accès aux fichiers audio</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={songs}
                renderItem={renderSongItem}
                keyExtractor={item => item.id}
                style={styles.list}
            />

            {currentSong && (
                <MusicPlayer
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    togglePlayPause={togglePlayPause}
                />
            )}
        </View>
    );
}
