import Button from "@mui/material/Button";

import {
	CLIENT_ID,
	REDIRECT_URI,
	AUTH_ENDPOINT,
	RESPONSE_TYPE,
} from "./spotify";

const SpotifyLogin = () => {
	const login = () => {
		const href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
		window.open(href, "_self");
	};

	return (
		<Button color="primary" variant="outlined" onClick={login}>
			Login to Spotify
		</Button>
	);
};

export default SpotifyLogin;
