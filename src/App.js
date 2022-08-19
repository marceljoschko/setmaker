import { useAppState, useDispatch } from "./app-state";
import { useEffect, Fragment } from "react";

import Main from "./main";
import Header from "./header";
import SpotifyLogin from "./spotify-login";
import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";

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
		<Fragment>
			{!token ? (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						minHeight: "100vh",
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						setmaker
					</Typography>
					<SpotifyLogin />
				</Box>
			) : (
				<Box>
					<Header />
					<Main />
				</Box>
			)}
		</Fragment>
	);
};

export default App;
