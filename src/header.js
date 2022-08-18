/** @jsxRuntime classic */
/** @jsx jsx */
import { useEffect } from "react";
import { jsx } from "theme-ui";

import axios from "axios";

import { useAppState, useDispatch } from "./app-state";

const Header = () => {
	const dispatch = useDispatch();
	const { user, token } = useAppState();

	useEffect(() => {
		getUserProfile();
	}, [token]);

	const logout = () => {
		dispatch({ type: "UPDATE_TOKEN", payload: "" });
		window.localStorage.removeItem("token");
	};

	const getUserProfile = async () => {
		const response = await axios.get("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const user = {
			id: response.data.id,
			img: response.data.images[0].url,
			name: response.data.display_name,
		};
		dispatch({ type: "UPDATE_USER", payload: user });
	};

	return (
		<div>
			<h1>setmaker</h1>
			<button>
				<img src={user.img} alt={user.name} onClick={logout} />
			</button>
		</div>
	);
};

export default Header;
