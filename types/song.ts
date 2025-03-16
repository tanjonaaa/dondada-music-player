import {Asset} from "expo-media-library";

export interface Song {
    id: string;
    title: string;
    artist: string;
    uri: string;
    duration: string;
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
        duration: formatDuration(asset.duration)
    };
}

const formatDuration = (seconds: number): string => {
    const roundedSeconds = Math.floor(seconds);
    const minutes = Math.floor(roundedSeconds / 60);
    const remainingSeconds = roundedSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
