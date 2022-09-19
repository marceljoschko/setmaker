import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";

import { useStudioState, useDispatch } from "../../../studio-state";
import { findCamelotKey, findFlatKey, ALL_FLAT_KEYS } from "../../../util";
import axios from "axios";
import { index, shuffle } from "d3";
import { flow } from "lodash";
import {
    createHarmonicMixingPattern,
    applyPattern,
} from "../../../camelot_wheel";

export default function StepFour(props) {
    const { token, importedTracks, numberOfTracks, energyMap, energyFeature } =
        useStudioState();
    const dispatch = useDispatch();

    let trackData = {};
    let energyMin = 1;
    let energyMax = 0;
    let tempoMin = 200;
    let tempoMax = 0;

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

            checkEnergyLevel(temp.energy);
            checkBPMLevel(bpmTempo);

            trackData[temp.id] = {
                ...importedTracks[temp.id],
                energy: temp.energy,
                valence: temp.valence,
                key: temp.key,
                mode: temp.mode,
                bpm: bpmTempo,
                camelot: findCamelotKey(temp.key, temp.mode),
                flat: findFlatKey(temp.key, temp.mode),
            };
        }
    };

    const checkBPMLevel = (bpm) => {
        if (bpm > tempoMax) {
            tempoMax = bpm;
        } else if (bpm < tempoMin) {
            tempoMin = bpm;
        }
    };

    const checkEnergyLevel = (energy) => {
        if (energy > energyMax) {
            energyMax = energy;
        } else if (energy < energyMin) {
            energyMin = energy;
        }
    };

    const getEnergyBaseline = () => {
        return Math.abs(energyMax - energyMin) / 2 + energyMin;
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
        const audio_features = features.data.audio_features;
        for (let i in audio_features) {
            let temp = audio_features[i];
            let bpmTempo = Math.round(temp.tempo);

            checkEnergyLevel(temp.energy);
            checkBPMLevel(bpmTempo);

            trackData[temp.id] = {
                ...trackData[temp.id],
                popularity: trackArray[i].popularity,
                trackName: trackArray[i].name,
                artists: trackArray[i].album.artists,
                images: trackArray[i].album.images,
                releaseDate: trackArray[i].album.release_date,
                releaseYear: parseInt(
                    trackArray[i].album.release_date.slice(0, 4)
                ),
                energy: temp.energy,
                valence: temp.valence,
                key: temp.key,
                mode: temp.mode,
                bpm: bpmTempo,
                camelot: findCamelotKey(temp.key, temp.mode),
                flat: findFlatKey(temp.key, temp.mode),
            };
        }
    };

    const filterTrackData = (trackData, releaseYear, popularity) => {
        let filteredTrackData = flow([
            Object.entries,
            (arr) =>
                arr.filter(([key, value]) => {
                    if (
                        value.popularity <= popularity.max &&
                        value.popularity >= popularity.min &&
                        value.releaseYear <= releaseYear.max &&
                        value.releaseYear >= releaseYear.min
                    ) {
                        return true;
                    } else {
                        return false;
                    }
                }),
            Object.fromEntries,
        ])(trackData);

        return filteredTrackData;
    };

    const getRecommendations = async () => {
        const tracks = Object.keys(importedTracks);

        for (let i in tracks) {
            const artists = importedTracks[tracks[i]].artists
                .map((artist) => {
                    return artist.id;
                })
                .join(",");
            const response = await axios.get(
                "https://api.spotify.com/v1/recommendations",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        seed_artists: artists,
                        seed_genres: "Techno",
                        seed_tracks: tracks[i],
                        limit: 100,
                        min_tempo: tempoMin,
                        max_tempo: tempoMax,
                    },
                }
            );

            analyzeRecommendations(response.data.tracks);
        }
    };

    const getRandomKeyFromMainTracks = (mainTracks) => {
        let rndNum = Math.floor(Math.random() * mainTracks.length);
        return trackData[mainTracks[rndNum]].flat;
    };

    const scale = (inputY, yRange, xRange) => {
        const [xMin, xMax] = xRange;
        const [yMin, yMax] = yRange;

        const percent = (inputY - yMin) / (yMax - yMin);
        const outputX = percent * (xMax - xMin) + xMin;

        return outputX;
    };

    const convertEnergyMap = () => {
        let convertedEnergy = [];

        for (let i in energyMap) {
            convertedEnergy[i] = scale(
                energyMap[i],
                [0, 1],
                [energyMin, energyMax]
            );
        }

        return convertedEnergy;
    };

    const getRandomFlatKey = () => {
        let rndNum = Math.floor(Math.random() * ALL_FLAT_KEYS.length);
        return ALL_FLAT_KEYS[rndNum];
    };

    const indexesOf = (arr, item) =>
        arr.reduce((acc, v, i) => (v === item && acc.push(i), acc), []);

    const sortTracks = async (trackData, filteredTrackData) => {
        const convertedEnergyMap = convertEnergyMap();

        let energyTolerance = getEnergyBaseline() / 2;

        let fillTracks = Object.keys(filteredTrackData);

        let mainTracks = Object.keys(importedTracks);

        let sortedTracks = new Array(numberOfTracks).fill("");

        let tracklistComplete = false;
        let iterations = 0;

        let startingTrack = 0;

        let mainTracksNRG = mainTracks.map((x) => {
            return trackData[x].energy;
        });

        for (let i in mainTracksNRG) {
            if (
                Math.abs(mainTracksNRG[i] - convertedEnergyMap[0]) <
                Math.abs(mainTracksNRG[startingTrack] - convertedEnergyMap[0])
            ) {
                startingTrack = i;
            }
        }

        let startingKey = trackData[mainTracks[startingTrack]].flat;

        while (!tracklistComplete) {
            iterations++;
            console.log("Versuch: " + iterations);

            let pattern = createHarmonicMixingPattern(numberOfTracks);

            //let rndKey = getRandomFlatKey();
            let rndKey = getRandomKeyFromMainTracks(mainTracks);
            let keyArr = applyPattern(rndKey, pattern);
            let camArr = keyArr.map((key) => key.hour + key.letter);

            // for (let i in mainTracks) {
            //     let tempKey = trackData[mainTracks[i]].camelot;

            //     const indexes = [];
            //     let addedTrack = false;

            //     for (let index = 0; index < camArr.length; index++) {
            //         if (camArr[index] === tempKey) {
            //             indexes.push(index);
            //         }
            //     }
            //     if (indexes.length > 0) {
            //         shuffle(indexes);
            //         if (energyFeature) {
            //             for (let j in indexes) {
            //                 if (
            //                     Math.abs(
            //                         mainTracksNRG[i] -
            //                             convertedEnergyMap[indexes[j]]
            //                     ) <= energyTolerance
            //                 ) {
            //                     sortedTracks[indexes[j]] = mainTracks[i];
            //                     camArr[indexes[j]] = "XX";
            //                     addedTrack = true;
            //                     break;
            //                 }
            //             }
            //             if (!addedTrack) {
            //                 const index = mainTracks.indexOf(mainTracks[i]);
            //                 if (index > -1) {
            //                     mainTracks.splice(index, 1);
            //                 }
            //             }
            //         } else {
            //             sortedTracks[indexes[0]] = mainTracks[i];
            //             camArr[indexes[0]] = "XX";
            //             continue;
            //         }
            //     } else {
            //         const index = mainTracks.indexOf(mainTracks[i]);
            //         if (index > -1) {
            //             mainTracks.splice(index, 1);
            //         }
            //     }
            // }

            for (let i in mainTracks) {
                let tempKey = trackData[mainTracks[i]].camelot;

                if (camArr.indexOf(tempKey) > -1) {
                    let pos = camArr.indexOf(tempKey);

                    sortedTracks[pos] = mainTracks[i];
                    camArr[pos] = "XX";
                } else {
                    const index = mainTracks.indexOf(mainTracks[i]);
                    if (index > -1) {
                        mainTracks.splice(index, 1);
                    }
                }
            }

            shuffle(fillTracks);
            for (let i = 0; i < numberOfTracks; i++) {
                if (sortedTracks[i]) {
                    continue;
                }

                let camelotNeighbors = flow([
                    Object.entries,
                    (arr) =>
                        arr.filter(([key, value]) => {
                            return value.camelot === camArr[i] ? true : false;
                        }),
                    Object.fromEntries,
                ])(filteredTrackData);

                // let energyNeighbors = flow([
                //     Object.entries,
                //     (arr) =>
                //         arr.filter(([key, value]) => {
                //             return value.energy <=
                //                 convertedEnergyMap[i] + energyTolerance &&
                //                 value.energy >=
                //                     convertedEnergyMap[i] - energyTolerance
                //                 ? true
                //                 : false;
                //         }),
                //     Object.fromEntries,
                // ])(camelotNeighbors);

                let neighborsArr = Object.keys(camelotNeighbors);

                shuffle(neighborsArr);

                while (sortedTracks.includes(neighborsArr[0])) {
                    neighborsArr.shift();
                    shuffle(neighborsArr);
                }

                sortedTracks[i] = neighborsArr[0] ? neighborsArr[0] : "";
            }

            if (!sortedTracks.includes("")) {
                tracklistComplete = true;
            } else {
                console.log("Failed try again");
            }
        }

        dispatch({ type: "UPDATE_SORTED_PLAYLIST", payload: sortedTracks });
    };

    const createSet = async () => {
        await analyzeTracks();
        await getRecommendations();
        let filteredTrackData = filterTrackData(
            trackData,
            { min: 2000, max: 2022 },
            { min: 0, max: 100 }
        );
        await sortTracks(trackData, filteredTrackData);
        dispatch({ type: "UPDATE_TRACK_DATA", payload: trackData });
        props.nextStep();
    };

    return (
        <StepContainer>
            <h1>Sort and Find Tracks</h1>
            <Button variant="outlined" onClick={createSet}>
                Create Set
            </Button>
            <ActionButtons prev={{ onClick: props.previousStep }} />
        </StepContainer>
    );
}
