import { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import * as MediaLibrary from 'expo-media-library';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import { styles } from '../../styles/index.styles';
import { Song } from '../../types/song';

export default function Index() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [permission, setPermission] = useState<boolean>(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setupAudio();
    requestPermission();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const setupAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Erreur lors de la configuration audio:', error);
    }
  };

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      setPermission(true);
      loadSongs();
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

      const songs = audioFiles.map(asset => {
        // Extract° du titre et de l'artiste du nom de fichier
        const filename = asset.filename.replace(/\.[^/.]+$/, ""); // Enlève l'extension
        let title = filename;
        let artist = 'Artiste inconnu';

        // Patterns communs de nommage: "Artiste - Titre" ou "Artiste _ Titre" ou "Artiste–Titre"
        const separators = [' - ', ' _ ', ' – ', '-', '_', '–'];
        for (let separator of separators) {
          if (filename.includes(separator)) {
            [artist, title] = filename.split(separator).map(s => s.trim());
            break;
          }
        }

        return {
          id: asset.id,
          title: title
            .replace(/[_-]/g, " ") // Remplace les _ et - restants par des espaces
            .trim(),
          artist: artist
            .replace(/[_-]/g, " ")
            .trim(),
          uri: asset.uri,
          duration: asset.duration
        };
      });

      setSongs(songs);
    } catch (error) {
      console.error('Erreur lors du chargement des musiques:', error);
    }
  };

  const playSound = async (song: Song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.uri },
        { shouldPlay: true },
        (status) => {
          if ('isLoaded' in status && status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        }
      );

      await newSound.setStatusAsync({
        progressUpdateIntervalMillis: 1000,
        positionMillis: 0,
        shouldPlay: true,
        rate: 1.0,
        shouldCorrectPitch: true,
      });

      setSound(newSound);
      setCurrentSong(song);
      setIsPlaying(true);
    } catch (error) {
      console.error('Erreur lors de la lecture:', error);
    }
  };

  const togglePlayPause = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const renderSongItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={styles.songItem}
      onPress={() => playSound(item)}
    >
      <View>
        <Text style={styles.songTitle}>{item.title}</Text>
        <Text style={styles.songArtist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

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
        <View style={styles.player}>
          <Text style={styles.currentTitle} numberOfLines={1}>
            {currentSong.title}
          </Text>
          <TouchableOpacity onPress={togglePlayPause}>
            <FontAwesome
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
