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

import DraggableList from "react-draggable-lists";

import { useStudioState, useDispatch } from "../../../studio-state";
import { getCurrentDate } from "../../../util";

import { useRef } from "react";

import UploadAndDisplayImage from "./upload-image";

export default function StepFive(props) {
	const { sortedPlaylist } = useStudioState();
	const trackListRef = useRef();

	const getNewOrder = () => {
		let tracklist = document.querySelectorAll("[data-track-id]");

		const tempOrder = {};

		for (let i in tracklist) {
			let info = tracklist[i].parentElement.style.transform;
			let first = info.slice(16);

			let trackPosition =
				parseInt(first.substring(0, first.indexOf("p"))) / 50;

			tempOrder[trackPosition] =
				tracklist[i].getAttribute("data-track-id");
		}
		const newOrder = Object.keys(tempOrder);

		console.log(newOrder);
	};

	const generate = (items) => {
		return items.map((item) =>
			cloneElement(
				<ListItem data-track-id={item.id}>
					<ListItemAvatar>
						<Avatar alt={item.trackName} src={item.images[2].url} />
					</ListItemAvatar>
					<ListItemText primary={item.trackName} />
					<ListItemText
						primary={item.artists
							.map((artist) => {
								return artist.name;
							})
							.join(",")}
					/>
					<ListItemText primary={item.bpm} />
					<ListItemText primary={item.camelot} />
				</ListItem>
			)
		);
	};

	return (
		<StepContainer>
			<h1>Results</h1>

			<Button variant="outlined" onClick={getNewOrder}>
				Create Playlist Spotify
			</Button>
			<Box sx={{ display: "flex", width: "600px", my: 3 }}>
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
						defaultValue="Default Value"
					/>
				</Box>
			</Box>

			<Box sx={{ display: "flex" }}>
				<List sx={{ display: "flex" }}>
					<DraggableList
						ref={trackListRef}
						width={800}
						height={50}
						rowSize={1}
					>
						{generate(sortedPlaylist)}
					</DraggableList>
				</List>
			</Box>

			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
