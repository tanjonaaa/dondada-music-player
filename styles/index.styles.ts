import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  songItem: {
    padding: 15,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  songArtist: {
    fontSize: 14,
  },
  player: {
    flexDirection: 'row',
    paddingHorizontal: 70,
    paddingTop: 20,
    justifyContent: 'space-between',
    height: 150,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    position: 'relative',
    bottom: 0,
  },
  currentTitle: {
    flex: 1,
    marginRight: 15,
    fontSize: 16,
  },
  songMetadata: {
    flexDirection: 'column',
    height: 40,
  },
  globalMusicPlayerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    zIndex: 1000,
  },
  musicPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  songsListContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 80,
  },
}); 