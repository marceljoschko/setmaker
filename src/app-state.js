/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { createContext, useContext, useReducer } from "react";

const initialState = () => ({ token: "" });

const reducer = (state, action) => {
	switch (action.type) {
		case "UPDATE_TOKEN":
			return { ...state, token: action.payload };

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

export const useAppState = (property = null) => {
	const state = useContext(stateContext);
	return property !== null ? state[property] : state;
};
