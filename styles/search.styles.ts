import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 8,
        position: 'relative',
    },
    searchInput: {
        flex: 1,
        height: 44,
        paddingHorizontal: 12,
        fontSize: 16,
    },
    list: {
        flex: 1,
    },
    songItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(0,0,0,0.1)',
    },
    playingSong: {
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    songInfo: {
        flex: 1,
        marginLeft: 12,
    },
    artwork: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
    artworkPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    songTitle: {
        fontSize: 16,
        marginBottom: 4,
    },
    songArtist: {
        fontSize: 14,
        opacity: 0.8,
    },
    duration: {
        marginLeft: 8,
        fontSize: 14,
        opacity: 0.8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchIcon: {
        position: 'absolute',
        left: 12,
        zIndex: 1,
    },
    searchLoader: {
        position: 'absolute',
        right: 10
    },
    footerLoader: {
        marginVertical: 20
    },
}); 