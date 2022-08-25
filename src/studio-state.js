import { createContext, useContext, useReducer } from "react";

export const PLAYLIST_SOURCE_NONE = "none";
export const IMPORT_PLAYLIST = "import";

const initialState = () => ({
	token: "",
	user: { id: "", img: "", name: "" },
	playlistChoice: "none",
	playlistId: "",
	importedTracks: {},
	sortedPlaylist: [],
});

const reducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_TOKEN":
			return { ...state, token: action.payload };

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
