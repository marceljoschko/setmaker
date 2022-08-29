import {
	Box,
	Typography,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";

export default function SubGenres(props) {
	const handleChangeFirst = (event, newValue) => {
		props.dispatch({
			type: "UPDATE_SUB_GENRES_FIRST",
			payload: newValue,
		});
	};

	const handleChangeSecond = (event, newValue) => {
		props.dispatch({
			type: "UPDATE_SUB_GENRES_SECOND",
			payload: newValue,
		});
	};
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				flexDirection: "row",
				width: "100%",
				mb: 2,
			}}
		>
			<Typography>Subgenres</Typography>
			<Box sx={{ display: "flex", width: 300 }}>
				<Box>
					<ToggleButtonGroup
						value={props.subGenresFirst}
						onChange={handleChangeFirst}
						aria-label="select genres"
						sx={{ mb: 1 }}
					>
						<ToggleButton value="acid">Acid</ToggleButton>
						<ToggleButton value="dark">Dark</ToggleButton>
						<ToggleButton value="hard">Hard</ToggleButton>
					</ToggleButtonGroup>
					<ToggleButtonGroup
						value={props.subGenresSecond}
						onChange={handleChangeSecond}
						aria-label="select genres"
						sx={{ width: "100%" }}
					>
						<ToggleButton value="melodic">Melodic</ToggleButton>
						<ToggleButton value="minimal">Minimal</ToggleButton>
						<ToggleButton value="raw">Raw</ToggleButton>
					</ToggleButtonGroup>
				</Box>
			</Box>
		</Box>
	);
}
