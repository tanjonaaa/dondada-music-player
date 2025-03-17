import {Asset} from "expo-music-library";
import {Track} from "react-native-track-player";

export interface Song {
    id?: string;
    title?: string;
    artist?: string;
    uri: string;
    duration?: number;
    formattedDuration?: string;
    artwork?: string;
}

export const mapAssetToSong = (asset: Asset): Song => {
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
        duration: asset.duration,
        formattedDuration: formatDuration(asset.duration),
        artwork: asset.artwork,
    };
};

export const mapTrackToSong = (track: Track): Song => {
    return {
        uri: track.url,
        title: track.title,
        artist: track.artist,
        duration: track.duration,
        formattedDuration: formatDuration(track.duration)
    }
}

const formatDuration = (seconds: number | undefined): string => {
    if (seconds === undefined) {
        return "";
    }
    const roundedSeconds = Math.floor(seconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
