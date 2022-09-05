import { useEffect, Fragment, useState } from "react";
import { Typography, Box } from "@mui/material";

import { useStudioState, useDispatch } from "./studio-state";
import Studio from "./ui/studio/page";
import Header from "./ui/header/header";
import SpotifyLogin from "./spotify-login";

const App = () => {
    const dispatch = useDispatch();
    const { token, expiresIn, expirationSet } = useStudioState();
    const [activeStep, updateActiveStep] = useState(0);

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
        let expiresIn = window.localStorage.getItem("expires_in");

        if (expiresIn && parseInt(Date.now() / 1000) > expiresIn) {
            dispatch({ type: "UPDATE_TOKEN", payload: "" });
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("expires_in");
            window.location.reload(false);
        }

        if (!token && hash) {
            token = hash
                .substring(1)
                .split("&")
                .find((elem) => elem.startsWith("access_token"))
                .split("=")[1];

            let tempExpiresIn = parseInt(Date.now() / 1000) + 3600;

            window.location.hash = "";
            window.localStorage.setItem("token", token);
            window.localStorage.setItem("expires_in", tempExpiresIn);
        }
        dispatch({ type: "UPDATE_TOKEN", payload: token });
    }, []);

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
