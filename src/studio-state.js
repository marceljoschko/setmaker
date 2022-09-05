import { createContext, useContext, useReducer } from "react";

export const PLAYLIST_SOURCE_NONE = "none";
export const IMPORT_PLAYLIST = "import";

const initialState = () => ({
    token: "",
    expiresIn: 0,
    expirationSet: false,
    user: { id: "", img: "", name: "" },
    playlistChoice: "none",
    playlistId: "",
    importedTracks: {},
    sortedPlaylist: [],
    setName: "",
    numberOfTracks: 10,
    emotionMatrix: [],
    subGenresFirst: [],
    subGenresSecond: [],
    bpmRange: [130, 140],
    releaseYear: [1990, 2010],
});

const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_TOKEN":
            return { ...state, token: action.payload };

        case "UPDATE_EXPIRATION":
            return { ...state, expiresIn: action.payload };

        case "UPDATE_EXPIRATION_SET":
            return { ...state, expirationSet: action.payload };

        case "UPDATE_USER":
            return { ...state, user: action.payload };

        case "CHOOSE_PLAYLIST":
            return { ...state, playlistChoice: action.payload };

        case "IMPORT_PLAYLIST_ID":
            return { ...state, playlistId: action.payload };

        case "IMPORT_PLAYLIST_TRACKS":
            return { ...state, importedTracks: action.payload };

        case "UPDATE_SORTED_PLAYLIST":
            return { ...state, sortedPlaylist: action.payload };

        case "UPDATE_SET_NAME":
            return { ...state, setName: action.payload };

        case "UPDATE_NUMBER_OF_TRACKS":
            return { ...state, numberOfTracks: action.payload };

        case "UPDATE_SUB_GENRES_FIRST":
            return { ...state, subGenresFirst: action.payload };

        case "UPDATE_EMOTION_MATRIX":
            return { ...state, emotionMatrix: action.payload };

        case "UPDATE_SUB_GENRES_SECOND":
            return { ...state, subGenresSecond: action.payload };

        case "UPDATE_BPM_RANGE":
            return { ...state, bpmRange: action.payload };

        case "UPDATE_RELEASE_YEAR":
            return { ...state, releaseYear: action.payload };

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
