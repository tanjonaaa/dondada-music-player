import TrackPlayer, {Event} from 'react-native-track-player'

export const playbackService = async () => {
    TrackPlayer.addEventListener(Event.RemoteSeek, async ({ position }) => {
        await TrackPlayer.seekTo(position);
      });
      
    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemoteStop, () => {
        TrackPlayer.stop()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })
}
