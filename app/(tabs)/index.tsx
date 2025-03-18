import {useEffect} from 'react';
import {View, BackHandler, Alert} from "react-native";
import {styles} from '@/styles/index.styles';
import SongsList from "@/components/SongsList";
import {useSongs} from "@/hooks/useSongs";
import useAudioStore from "@/stores/useAudioStore";
import {SongDetails} from "@/components/songDetails/SongDetails";
import useSongStore from "@/stores/useSongStore";
import GlobalMusicPlayer from "@/components/GlobalMusicPlayer";
import {useNavigationState} from '@react-navigation/native';

export default function Index() {
    const {songs, loading} = useSongs();
    const {currentSong} = useAudioStore();
    const {songToShow} = useSongStore();

    const isFocused = useNavigationState(state => state.index === 0);

    useEffect(() => {
        if(!isFocused) return;

        const backAction = () => {
            if (songToShow) {
                useSongStore.getState().setSongToShow(null);
                return true;
            }
            
            Alert.alert(
                "Quitter l'application",
                "Êtes-vous sûr de vouloir quitter l'application ?",
                [
                    {
                        text: "Annuler",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "Oui", onPress: () => BackHandler.exitApp() }
                ],
                { cancelable: false }
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [isFocused, songToShow]);

    // Si les détails de la chanson sont affichés, ne montrer que SongDetails
    if (songToShow && currentSong) {
        return (
            <View style={styles.container}>
                <SongDetails song={currentSong} />
            </View>
        );
    }

    // Sinon, afficher la liste des chansons et le lecteur de musique
    return (
        <View style={styles.container}>
            <View style={styles.musicPlayerContainer}>
                <GlobalMusicPlayer />
            </View>
            
            <View style={styles.songsListContainer}>
                <SongsList songs={songs} loading={loading}/>
            </View>
        </View>
    );
}
