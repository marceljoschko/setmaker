/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import {
	CLIENT_ID,
	REDIRECT_URI,
	AUTH_ENDPOINT,
	RESPONSE_TYPE,
	AUTH_SCOPE,
} from "./spotify";

import React, { useEffect } from "react";
import { useAppState, useDispatch } from "../app-state";

export default function Login() {
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
	}, []);

	const logout = () => {
		dispatch({ type: "UPDATE_TOKEN", payload: "" });
		window.localStorage.removeItem("token");
	};

	return token ? (
		<div>test</div>
	) : (
		<div
			sx={{
				display: "flex",
				color: "white",
				alignItems: "center",
				justifyContent: "center",
				width: "100%",
				flexDirection: "column",
			}}
		>
			<h1>setmaker</h1>
			<a
				href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${AUTH_SCOPE}`}
			>
				Login to Spotify
			</a>
		</div>
	);
}
