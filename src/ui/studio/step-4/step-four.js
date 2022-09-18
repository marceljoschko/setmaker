import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";
import React from "react";
import { useStudioState, useDispatch } from "../../../studio-state";
import { findCamelotKey } from "../../../util";
import axios from "axios";
import { shuffle } from "d3";
import { flow } from "lodash";
import { camelotWheel } from "../../../camelot_wheel";

export default function StepFour(props) {
    const { token, importedTracks, numberOfTracks } = useStudioState();
    const dispatch = useDispatch();

    let trackData = {};
    let tempMin = 200;
    let tempMax = 0;

    const analyzeTracks = async () => {
        let ids = Object.keys(importedTracks).join(",");

        const features = await axios.get(
            "https://api.spotify.com/v1/audio-features",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ids: ids,
                },
            }
        );

        const audio_features = features.data.audio_features;
        for (let i in audio_features) {
            let temp = audio_features[i];
            let bpmTempo = Math.round(temp.tempo);

            if (bpmTempo > tempMax) {
                tempMax = bpmTempo;
            } else if (bpmTempo < tempMin) {
                tempMin = bpmTempo;
            }

            trackData[temp.id] = {
                ...importedTracks[temp.id],
                energy: temp.energy,
                valence: temp.valence,
                key: temp.key,
                mode: temp.mode,
                bpm: bpmTempo,
                camelot: findCamelotKey(temp.key, temp.mode),
            };
        }
    };

    const analyzeRecommendations = async (trackArray) => {
        let ids = trackArray
            .map((track) => {
                return track.id;
            })
            .join(",");

        const features = await axios.get(
            "https://api.spotify.com/v1/audio-features",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    ids: ids,
                },
            }
        );
        const payload = {};
        const audio_features = features.data.audio_features;
        for (let i in audio_features) {
            let temp = audio_features[i];
            let bpmTempo = Math.round(temp.tempo);

            trackData[temp.id] = {
                ...trackData[temp.id],
                popularity: trackArray[i].popularity,
                trackName: trackArray[i].name,
                artists: trackArray[i].album.artists,
                images: trackArray[i].album.images,
                releaseDate: trackArray[i].album.release_date,
                energy: temp.energy,
                valence: temp.valence,
                key: temp.key,
                mode: temp.mode,
                bpm: bpmTempo,
                camelot: findCamelotKey(temp.key, temp.mode),
            };
        }
    };

    const getRecommendations = async () => {
        const tracks = Object.keys(importedTracks);

        for (let i in tracks) {
            const response = await axios.get(
                "https://api.spotify.com/v1/recommendations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        seed_artists: importedTracks[tracks[i]].artists
                            .map((artist) => {
                                return artist.id;
                            })
                            .join(","),
                        seed_genres: "techno",
                        seed_tracks: tracks[i],
                        limit: 100,
                        min_tempo: tempMin - 5,
                        max_tempo: tempMax + 5,
                    },
                }
            );

            analyzeRecommendations(response.data.tracks);
        }
    };

    const sortTracks = async () => {
        let fillTracks = Object.keys(trackData);

        let mainTracks = Object.keys(importedTracks);

        shuffle(fillTracks);
        let randomTracks = mainTracks;
        if (numberOfTracks - mainTracks.length > 0) {
            randomTracks = mainTracks.concat(
                fillTracks.slice(0, numberOfTracks - mainTracks.length - 1)
            );
        }
        shuffle(randomTracks);

        //check if finish lol?

        dispatch({ type: "UPDATE_SORTED_PLAYLIST", payload: randomTracks });
    };

    const createSet = async () => {
        await analyzeTracks();
        await getRecommendations();
        await sortTracks();
        dispatch({ type: "UPDATE_TRACK_DATA", payload: trackData });
        props.nextStep();
    };

    return (
        <StepContainer>
            <Button variant="outlined" onClick={createSet}>
                Create Set
            </Button>
            <ActionButtons prev={{ onClick: props.previousStep }} />
        </StepContainer>
    );
}
