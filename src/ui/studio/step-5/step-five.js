import { ActionButtons, StepContainer } from "../elements";
import { cloneElement } from "react";
import {
    Button,
    Box,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    List,
    TextField,
} from "@mui/material";
import "./styles.css";

import DraggableList from "react-draggable-lists";

import { useStudioState, useDispatch } from "../../../studio-state";
import { getCurrentDate } from "../../../util";

import { useRef } from "react";

import axios from "axios";

import UploadAndDisplayImage from "./upload-image";
import SetName from "./set-name";

export default function StepFive(props) {
    const dispatch = useDispatch();
    const { sortedPlaylist, setName, user, token } = useStudioState();
    const trackListRef = useRef();

    const getNewOrder = async () => {
        let tracklist = document.querySelectorAll("[data-track-id]");

        const tempOrder = {};

        for (let i in tracklist) {
            try {
                let info = tracklist[i].parentElement.style.transform;
                let first = info.slice(16);

                let trackPosition =
                    parseInt(first.substring(0, first.indexOf("p"))) / 50;

                tempOrder[trackPosition] =
                    tracklist[i].getAttribute("data-track-id");
            } catch (e) {}
        }
        const newOrder = Object.keys(tempOrder);

        const uris = [];

        for (let i in tempOrder) {
            uris.push("spotify:track:" + tempOrder[i]);
        }

        console.log(uris);

        // const response = await axios.post(
        //     `https://api.spotify.com/v1/users/${user.id}/playlists`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        // );

        // const reponseTwo = await axios.get(
        //     `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
        //     {
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //     }
        // );
    };

    const generate = (items) => {
        return items.map((item) =>
            cloneElement(
                <ListItem
                    data-track-id={item.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <ListItemAvatar>
                            <Avatar
                                alt={item.trackName}
                                src={item.images[2].url}
                            />
                        </ListItemAvatar>
                        <ListItemText primary={item.trackName} />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "50%",
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <ListItemText
                                primary={item.artists
                                    .map((artist) => {
                                        return artist.name;
                                    })
                                    .join(",")}
                            />
                        </Box>
                        <Box sx={{ display: "flex", width: "20%" }}>
                            <ListItemText primary={item.bpm} />
                            <ListItemText primary={item.camelot} />
                        </Box>
                    </Box>
                </ListItem>
            )
        );
    };

    let defaultText = "Test";

    return (
        <StepContainer>
            <h1>Results</h1>

            <Button variant="outlined" onClick={getNewOrder}>
                Create Playlist Spotify
            </Button>
            <Box
                sx={{
                    display: "flex",
                    width: "800px",
                    my: 3,
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box>
                    <SetName dispatch={dispatch} setName={setName} />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Avatar
                        sx={{ width: 125, height: 125 }}
                        variant="square"
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                    />

                    <TextField
                        sx={{ flex: "1 0 auto", ml: 5 }}
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        defaultValue={defaultText}
                    />
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                <List
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <DraggableList
                        ref={trackListRef}
                        width={800}
                        height={50}
                        rowSize={1}
                        className="draggable-list"
                    >
                        {generate(sortedPlaylist)}
                    </DraggableList>
                </List>
            </Box>

            <ActionButtons prev={{ onClick: props.previousStep }} />
        </StepContainer>
    );
}
