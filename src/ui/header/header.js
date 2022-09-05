import { useEffect } from "react";
import { AppBar, Container, Toolbar, Typography, Box } from "@mui/material";
import axios from "axios";

import AccountMenu from "./account-menu";
import { useStudioState, useDispatch } from "../../studio-state";

const Header = () => {
    const dispatch = useDispatch();
    const { user, token, expiresIn } = useStudioState();

    useEffect(() => {
        getUserProfile();
    }, [token]);

    const logout = () => {
        dispatch({ type: "UPDATE_TOKEN", payload: "" });
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("expires_in");
        window.location.reload(false);
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
        <AppBar
            position="static"
            sx={{ backgroundImage: "none", boxShadow: "none", height: "12vh" }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
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
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    />
                    <Box sx={{ flexGrow: 0 }}>
                        <AccountMenu
                            userName={user.name}
                            userImg={user.img}
                            expiresIn={expiresIn}
                            logout={logout}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
