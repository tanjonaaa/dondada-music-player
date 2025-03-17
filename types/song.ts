import {Asset} from "expo-music-library";
import {Track} from "react-native-track-player";
import { Image } from 'react-native';

export const unknownTrackImageUri = Image.resolveAssetSource(
  require('@/assets/images/unknown_track.png')
).uri;

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
    return {
        id: asset.id,
        title: asset.title || asset.filename.replace(/\.[^/.]+$/, "").trim(),
        artist: asset.artist || 'Artiste inconnu',
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
        formattedDuration: formatDuration(track.duration),
        artwork: track.artwork
    }
}

export const mapSongToTrack = (song: Song): Track => {
    return {
        url: song.uri,
        artist: song.artist,
        duration: song.duration,
        title: song.title,
        artwork: song.artwork,
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
