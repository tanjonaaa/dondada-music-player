import {Song} from "@/types/song";
import {create} from "zustand";


interface SongContextType {
    songToShow: Song | null;
    setSongToShow: (song: Song | null) => void;
}

const useSongStore = create<SongContextType>((setState, getState) => ({
    songToShow: null,
    setSongToShow: (song: Song | null) => setState({songToShow: song}),
}));

export default useSongStore;
