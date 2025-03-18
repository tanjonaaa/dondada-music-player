import {SplashScreen, Stack} from "expo-router";
import {useColorScheme} from "react-native";
import {ThemeProvider} from "@react-navigation/native";
import {darkTheme, lightTheme} from "@/themes";
import TrackPlayer from "react-native-track-player";
import {playbackService} from "@/constants/playbackPlayer";
import {useCallback} from "react";
import {useSetupTrackPlayer} from "@/hooks/useSetupTrackPlayer";
import {useLogTrackPlayerState} from "@/hooks/useLogTrackPlayerState";
import {StatusBar} from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

let isServiceRegistered = false;

export default function RootLayout() {
    const colorScheme = useColorScheme();

    const handleTrackPlayerLoaded = useCallback(() => {
        SplashScreen.hideAsync()
    }, [])

    useSetupTrackPlayer({
        onLoad: handleTrackPlayerLoaded,
    })

    useLogTrackPlayerState()

    if(!isServiceRegistered){
            TrackPlayer.registerPlaybackService(() => playbackService);
            isServiceRegistered = true;
        
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? darkTheme : lightTheme}>
            <StatusBar style="auto"/>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            </Stack>
        </ThemeProvider>
    );
}
