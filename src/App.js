import { useEffect, Fragment, useState } from "react";
import { Typography, Box } from "@mui/material";

import { useStudioState, useDispatch } from "./studio-state";
import Studio from "./ui/studio/page";
import Header from "./ui/header/header";
import SpotifyLogin from "./spotify-login";

const App = () => {
	const dispatch = useDispatch();
	const { token } = useStudioState();
	const [activeStep, updateActiveStep] = useState(0);

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
						sx={{
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
					<Studio
						activeStep={activeStep}
						updateActiveStep={updateActiveStep}
					/>
				</Box>
			)}
		</Fragment>
	);
};

export default App;
