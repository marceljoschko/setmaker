/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useAppState, useDispatch } from "./app-state";
import { useEffect } from "react";

import "./app.css";

import Header from "./header";

const CLIENT_ID = "c69871587c924a0c8bc3573cc3704410";
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const AUTH_SCOPE = "playlist-read-private playlist-modify-private";

const App = () => {
	const dispatch = useDispatch();
	const { token } = useAppState();

	useEffect(() => {
		const hash = window.location.hash;
		let token = window.localStorage.getItem("token");

		if (!token && hash) {
			token = hash
				.substring(1)
				.split("&")
				.find((elem) => elem.startsWith("access_token"))
				.split("=")[1];

			window.location.hash = "";
			window.localStorage.setItem("token", token);
		}
		dispatch({ type: "UPDATE_TOKEN", payload: token });
	}, [dispatch]);

	return (
		<div className="App">
			{!token ? (
				<div>
					<h1>setmaker</h1>
					<a
						href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
					>
						Login to Spotify
					</a>
				</div>
			) : (
				<div>
					<Header />
				</div>
			)}
		</div>
	);
};

export default App;
