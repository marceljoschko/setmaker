import { StepContainer } from "../elements";
import { Box, TextField, Button, LinearProgress } from "@mui/material";
import { Fragment } from "react";
import { useStudioState, useDispatch } from "../../../studio-state";

import axios from "axios";
import { shuffle } from "d3";

export default function StepOne(props) {
    const dispatch = useDispatch();
    const { token, playlistId, playlistIdError, startedImportProcess } =
        useStudioState();

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
        dispatch({ type: "UPDATE_STARTED_IMPORT_PROCESS", payload: true });
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${parsedPlaylistId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const imported = {};
        let tracks = response.data.tracks.items;

        if (tracks.length > 20) {
            shuffle(tracks);
            tracks = tracks.slice(0, 20);
        }

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
        dispatch({ type: "UPDATE_STARTED_IMPORT_PROCESS", payload: false });
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
                    <Button
                        sx={{ mb: 7 }}
                        variant="outlined"
                        onClick={inputCheck}
                    >
                        Import
                    </Button>
                    {startedImportProcess ? (
                        <Box sx={{ width: 800 }}>
                            <LinearProgress />
                        </Box>
                    ) : (
                        <Box></Box>
                    )}
                </Box>
            </Fragment>
        </StepContainer>
    );
}
