import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";
import { useStudioState, useDispatch } from "../../../studio-state";
import { findCamelotKey } from "../../../util";
import axios from "axios";
import { shuffle } from "d3";
import { flow } from "lodash";
import { camelotWheel } from "../../../camelot_wheel";

export default function StepFour(props) {
    const {
        token,
        importedTracks,
        bpmRange,
        numberOfTracks,
        subGenres,
        tempo,
    } = useStudioState();
    const dispatch = useDispatch();

    let trackData = {};
    let possibleTracks = [];
    let sortedTracks = [];

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

            importedTracks[temp.id] = {
                ...importedTracks[temp.id],
                energy: temp.energy,
                valence: temp.valence,
                key: temp.key,
                mode: temp.mode,
                bpm: bpmTempo,
                camelot: findCamelotKey(temp.key, temp.mode),
            };
        }

        trackData = importedTracks;
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

            trackData[temp.id] = {
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
        console.log(trackData);
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
                    },
                }
            );

            analyzeRecommendations(response.data.tracks);
        }
    };

    // const getAllTracks = async () => {
    //     let currentTracks = 0;
    //     const limit = 50;

    //     while (currentTracks < totalTracks) {
    //         const { data } = await searchTracks(
    //             subGenres,
    //             "",
    //             currentTracks,
    //             limit
    //         );

    //         const tracks = data.tracks.items;
    //         let ids = tracks[0].id;
    //         trackData[tracks[0].id] = {
    //             popularity: tracks[0].popularity,
    //             releaseDate: tracks[0].album.release_date,
    //         };

    //         for (let i = 1; i < tracks.length; i++) {
    //             trackData[tracks[i].id] = {
    //                 popularity: tracks[i].popularity,
    //                 releaseDate: tracks[i].album.release_date,
    //             };
    //             ids = ids + "," + tracks[i].id;
    //         }

    //         const features = await axios.get(
    //             "https://api.spotify.com/v1/audio-features",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //                 params: {
    //                     ids: ids,
    //                 },
    //             }
    //         );
    //         const audio_features = features.data.audio_features;
    //         for (let i = 0; i < audio_features.length; i++) {
    //             let temp = audio_features[i];
    //             let bpmTempo = Math.round(temp.tempo);
    //             if (selectedBpms.length && !selectedBpms.includes(bpmTempo)) {
    //                 delete trackData[temp.id];
    //                 continue;
    //             }
    //             trackData[temp.id] = {
    //                 ...trackData[temp.id],
    //                 energy: temp.energy,
    //                 key: temp.key,
    //                 mode: temp.mode,
    //                 valence: temp.valence,
    //                 bpm: bpmTempo,
    //                 instrumentalness: temp.instrumentalness,
    //                 speechiness: temp.speechiness,
    //                 camelot: findCamelotKey(temp.key, temp.mode),
    //             };
    //         }
    //         currentTracks += limit;
    //     }
    //     // shuffle the possible tracks
    //     possibleTracks = shuffle(Object.keys(trackData));

    //     const nTwo =
    //         possibleTracks.length > Math.pow(numberOfTracks)
    //             ? Math.pow(numberOfTracks)
    //             : possibleTracks.length;

    //     // take the first n^2 tracks where n is the number of tracks
    //     possibleTracks =
    //         possibleTracks.length > nTwo
    //             ? possibleTracks.slice(nTwo)
    //             : possibleTracks;

    //     // sort by energy

    //     let possibleSorted = Object.keys(trackData).sort(function (a, b) {
    //         return trackData[a].energy - trackData[b].energy;
    //     });

    //     // pick a rnd track in the middle range n^2 / 2 +- n/2
    //     let baseline = possibleSorted.slice(
    //         nTwo / 2 - numberOfTracks / 2,
    //         nTwo / 2 + numberOfTracks / 2
    //     );

    //     shuffle(baseline);
    //     sortedTracks.push(baseline[0]);

    //     //unshift push pop shift

    //     while (sortedTracks.length < numberOfTracks) {
    //         findCamelotNeighbor(sortedTracks[0]);
    //     }

    //     let analyzedData = {};

    //     // get images etc from new sortedTracks

    //     let ids = sortedTracks.join(",");

    //     const response = await axios.get(`https://api.spotify.com/v1/tracks`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         params: {
    //             ids: ids,
    //         },
    //     });

    //     const tracks = response.data.tracks;

    //     for (let i in sortedTracks) {
    //         analyzedData[sortedTracks[i]] = trackData[sortedTracks[i]];

    //         let temp = tracks[i];

    //         analyzedData[sortedTracks[i]] = {
    //             ...analyzedData[sortedTracks[i]],
    //             popularity: temp.popularity,
    //             releaseDate: temp.album.release_date,
    //             images: temp.album.images,
    //             trackName: temp.name,
    //             artists: temp.album.artists,
    //         };
    //     }

    //     dispatch({
    //         type: "UPDATE_SORTED_PLAYLIST",
    //         payload: sortedTracks,
    //     });

    //     dispatch({
    //         type: "UPDATE_TRACK_DATA",
    //         payload: analyzedData,
    //     });
    //     props.nextStep();
    // };

    const findCamelotNeighbor = (track) => {
        let objKey = camelotWheel.getKeyNotationObjectCamelot(
            trackData[track].camelot
        );

        const possibleKeys = [];

        possibleKeys.push(
            camelotWheel.getKeyNotationFlat(camelotWheel.energyBoost(objKey))
        );
        possibleKeys.push(
            camelotWheel.getKeyNotationFlat(camelotWheel.energyDrop(objKey))
        );
        possibleKeys.push(
            camelotWheel.getKeyNotationFlat(camelotWheel.energyRaise(objKey))
        );
        possibleKeys.push(
            camelotWheel.getKeyNotationFlat(camelotWheel.energySwitch(objKey))
        );
        possibleKeys.push(
            camelotWheel.getKeyNotationFlat(camelotWheel.perfectMatch(objKey))
        );

        let neighbors = flow([
            Object.entries,
            (arr) =>
                arr.filter(([key, value]) => {
                    if (possibleKeys.includes(value.camelot)) {
                        if (!sortedTracks.includes(key)) {
                            return value;
                        }
                    }
                }),
            Object.fromEntries,
        ])(trackData);
        let neighborsArr = Object.keys(neighbors);
        shuffle(neighborsArr);

        sortedTracks.unshift(neighborsArr[0]);
    };

    const createSet = () => {
        //getAllTracks();
        analyzeTracks();
        getRecommendations();
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
