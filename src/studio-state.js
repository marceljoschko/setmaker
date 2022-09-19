import { createContext, useContext, useReducer } from "react";

const initialState = () => ({
    token: "",
    addTracks: false,
    user: { id: "", img: "", name: "" },
    playlistId: "",
    newPlaylistId: "",
    playlistIdError: false,
    importedTracks: {},
    sortedPlaylist: [],
    setName: "",
    setDescription: "",
    minNumberOfTracks: 0,
    numberOfTracks: 20,
    trackData: {},
    maxTempo: 0,
    minTempo: 0,
    energyPoints: [
        {
            x: 1,
            y: 200,
        },
        {
            x: 300,
            y: 200,
        },
        {
            x: 600,
            y: 200,
        },
    ],
    energyMap: [],
    progressBar: 0,
});

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_PROGRESS_BAR":
            return { ...state, progressBar: action.payload };

        case "UPDATE_ENERGY_MAP":
            return { ...state, energyMap: action.payload };

        case "UPDATE_ENERGY_POINTS":
            return { ...state, energyPoints: action.payload };

        case "UPDATE_ADD_TRACKS":
            return { ...state, addTracks: action.payload };

        case "UPDATE_TOKEN":
            return { ...state, token: action.payload };

        case "UPDATE_USER":
            return { ...state, user: action.payload };

        case "UPDATE_PLAYLIST_ID":
            return { ...state, playlistId: action.payload };

        case "UPDATE_NEW_PLAYLIST_ID":
            return { ...state, newPlaylistId: action.payload };

        case "UPDATE_PLAYLIST_ID_ERROR":
            return { ...state, playlistIdError: action.payload };

        case "IMPORT_PLAYLIST_TRACKS":
            return { ...state, importedTracks: action.payload };

        case "UPDATE_SORTED_PLAYLIST":
            return { ...state, sortedPlaylist: action.payload };

        case "UPDATE_SET_NAME":
            return { ...state, setName: action.payload };

        case "UPDATE_SET_DESCRIPTION":
            return { ...state, setDescription: action.payload };

        case "UPDATE_NUMBER_OF_TRACKS":
            return { ...state, numberOfTracks: action.payload };

        case "UPDATE_TRACK_DATA":
            return { ...state, trackData: action.payload };

        case "UPDATE_MIN_NUMBER_TRACKS":
            return { ...state, minNumberOfTracks: action.payload };

        case "RESET":
            return initialState();

        default:
            throw new Error();
    }
};

const stateContext = createContext(null);
const dispatchContext = createContext(null);

export const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState());

    return (
        <dispatchContext.Provider value={dispatch}>
            <stateContext.Provider value={state}>
                {children}
            </stateContext.Provider>
        </dispatchContext.Provider>
    );
};

export const useDispatch = () => useContext(dispatchContext);

export const useStudioState = (property = null) => {
    const state = useContext(stateContext);
    return property !== null ? state[property] : state;
};
