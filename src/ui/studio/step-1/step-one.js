import { ActionButtons, StepContainer, OptionButton } from "../elements";
import { Box, TextField, Button } from "@mui/material";
import { Fragment } from "react";
import {
	useStudioState,
	useDispatch,
	PLAYLIST_SOURCE_NONE,
	IMPORT_PLAYLIST,
} from "../../../studio-state";

import axios from "axios";

export default function StepOne(props) {
	const dispatch = useDispatch();
	const { token, playlistChoice, playlistId } = useStudioState();

	const importPlaylist = async () => {
		dispatch({ type: "CHOOSE_PLAYLIST", payload: IMPORT_PLAYLIST });
	};
	const startFromScratch = () => {
		props.nextStep();
	};

	const reselectSource = () => {
		dispatch({ type: "CHOOSE_PLAYLIST", payload: PLAYLIST_SOURCE_NONE });
	};

	const startImport = async () => {
		const response = await axios.get(
			`https://api.spotify.com/v1/playlists/${playlistId}`,
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
			};
		}

		dispatch({ type: "IMPORT_PLAYLIST_TRACKS", payload: imported });
		props.nextStep();
	};

	const body = (() => {
		switch (playlistChoice) {
			case PLAYLIST_SOURCE_NONE:
				return (
					<PlaylistSelection
						{...{
							importPlaylist,
							startFromScratch,
						}}
					/>
				);
			case IMPORT_PLAYLIST:
				return (
					<ImportPlaylist
						{...{ reselectSource, startImport, useDispatch }}
					/>
				);
			default:
				return "internal error :-(";
		}
	})();

	return <StepContainer>{body}</StepContainer>;
}

// The two large option buttons for "no audio" and "Microphone".
const PlaylistSelection = ({ importPlaylist, startFromScratch }) => {
	return (
		<Fragment>
			<h1>Select Playlist</h1>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: ["column", "row"],
					maxWidth: 850,
					width: "100%",
					mx: "auto",
					mb: 3,
					flex: "1 0 auto",
				}}
			>
				<OptionButton
					label="Import Playlist"
					onClick={importPlaylist}
				/>
				<OptionButton
					label="Start from Scratch"
					onClick={startFromScratch}
				/>
			</Box>
		</Fragment>
	);
};

const ImportPlaylist = ({ reselectSource, startImport, useDispatch }) => {
	const dispatch = useDispatch();
	return (
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
					height: "100%",
					mb: 3,
					flex: "1 0 auto",
				}}
			>
				<TextField
					id="standard-basic"
					label="Playlist ID"
					variant="standard"
					onChange={(e) =>
						dispatch({
							type: "IMPORT_PLAYLIST_ID",
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
				<Button variant="outlined" onClick={startImport}>
					Import
				</Button>
			</Box>

			<ActionButtons prev={{ onClick: reselectSource }} />
		</Fragment>
	);
};
