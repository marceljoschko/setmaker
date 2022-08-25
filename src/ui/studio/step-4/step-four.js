import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";
import { useStudioState, useDispatch } from "../../../studio-state";
import { findCamelotKey } from "../../../util";
import axios from "axios";
import { shuffle } from "d3";

export default function StepFour(props) {
	const { token, importedTracks, sortedPlaylist } = useStudioState();
	const dispatch = useDispatch();

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
				key: temp.key,
				mode: temp.mode,
				valence: temp.valence,
				bpm: bpmTempo,
				instrumentalness: temp.instrumentalness,
				speechiness: temp.speechiness,
				camelot: findCamelotKey(temp.key, temp.mode),
			};
		}

		const sorted = Object.keys(importedTracks).map((k) => {
			importedTracks[k] = {
				...importedTracks[k],
				id: k,
			};
			return importedTracks[k];
		});

		shuffle(sorted);

		//dispatch({ type: "UPDATE_IMPORTED_TRACKS", payload: importedTracks });
		dispatch({
			type: "UPDATE_SORTED_PLAYLIST",
			payload: sorted,
		});

		props.nextStep();
	};
	return (
		<StepContainer>
			<Button variant="outlined" onClick={analyzeTracks}>
				Create Set
			</Button>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
