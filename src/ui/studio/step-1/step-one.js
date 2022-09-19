import { StepContainer } from "../elements";
import { Box, TextField, Button } from "@mui/material";
import { Fragment } from "react";
import { useStudioState, useDispatch } from "../../../studio-state";

import axios from "axios";

export default function StepOne(props) {
    const dispatch = useDispatch();
    const { token, playlistId, playlistIdError } = useStudioState();

    const onlyLettersAndNumbers = (str) => {
        return /^[A-Za-z0-9]*$/.test(str);
    };

    const parsePlaylistInput = (input) => {
        let strArr = input.split("playlist/");
        if (strArr.length > 1) {
            strArr = strArr[1].split("?");
            if (strArr.length > 0) input = strArr[0];
        }

        if (input.length === 22 && onlyLettersAndNumbers(input)) return input;
        else {
            return "";
        }
    };

    const inputCheck = () => {
        const parsedPlaylistId = parsePlaylistInput(playlistId);
        if (!parsedPlaylistId) {
            dispatch({
                type: "UPDATE_PLAYLIST_ID_ERROR",
                payload: true,
            });
        } else {
            dispatch({
                type: "UPDATE_PLAYLIST_ID_ERROR",
                payload: false,
            });
            startImport(parsedPlaylistId);
        }
    };

    const startImport = async (parsedPlaylistId) => {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${parsedPlaylistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const imported = {};
        const tracks = response.data.tracks.items;

        for (let i in tracks) {
            let temp = tracks[i].track;
            imported[temp.id] = {
                popularity: temp.popularity,
                releaseDate: temp.album.release_date,
                releaseYear: parseInt(temp.album.release_date.slice(0, 4)),
                images: temp.album.images,
                trackName: temp.name,
                artists: temp.album.artists,
            };
        }

        let numberLength = Object.keys(imported).length;

        dispatch({ type: "IMPORT_PLAYLIST_TRACKS", payload: imported });
        dispatch({
            type: "UPDATE_MIN_NUMBER_TRACKS",
            payload: numberLength,
        });
        dispatch({
            type: "UPDATE_NUMBER_OF_TRACKS",
            payload: numberLength,
        });
        dispatch({
            type: "UPDATE_PLAYLIST_ID",
            payload: parsedPlaylistId,
        });
        props.nextStep();
    };

    return (
        <StepContainer>
            <Fragment>
                <h1>Import Playlist</h1>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        maxWidth: 850,
                        width: "100%",
                        mb: 3,
                    }}
                >
                    <TextField
                        sx={{ minWidth: "250px" }}
                        id="standard-basic"
                        label="Playlist ID"
                        variant="standard"
                        error={playlistIdError}
                        helperText={
                            playlistIdError ? "Playlist ID wrong!" : " "
                        }
                        onChange={(e) =>
                            dispatch({
                                type: "UPDATE_PLAYLIST_ID",
                                payload: e.target.value,
                            })
                        }
                    />

                    <Box
                        sx={{
                            flexGrow: 1,
                            height: "50px",
                            display: { xs: "none", md: "flex" },
                        }}
                    />
                    <Button variant="outlined" onClick={inputCheck}>
                        Import
                    </Button>
                </Box>
            </Fragment>
        </StepContainer>
    );
}
