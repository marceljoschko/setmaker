import { useStudioState } from "../../../studio-state";
import { ActionButtons, StepContainer } from "../elements";
import {
	Box,
	Slider,
	Typography,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";
import { useState } from "react";

export default function StepTwo(props) {
	const { importedTracks } = useStudioState();
	const [range, setRange] = useState([20, 37]);

	const [firstGenres, setFirstGenres] = useState([]);
	const [secondGenres, setSecondGenres] = useState([]);

	const handleFirstGenres = (event, newFormats) => {
		setFirstGenres(newFormats);
	};
	const handleSecondGenres = (event, newFormats) => {
		setSecondGenres(newFormats);
	};

	const handleChange = (event, newValue) => {
		setRange(newValue);
	};

	return (
		<StepContainer>
			<h1>Fill in metadata</h1>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					width: "500px",
				}}
			>
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
					<Typography>Set Name</Typography>
					<Box sx={{ display: "flex", width: 300 }}>
						<TextField id="standard-basic" variant="standard" />
					</Box>
				</Box>
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
					<Typography>Number of Tracks</Typography>
					<Box sx={{ display: "flex", width: 300 }}>
						<Slider
							size="small"
							defaultValue={70}
							aria-label="Small"
							valueLabelDisplay="auto"
						/>
					</Box>
				</Box>
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
								value={firstGenres}
								onChange={handleFirstGenres}
								aria-label="select genres"
								sx={{ mb: 1 }}
							>
								<ToggleButton value="acid">Acid</ToggleButton>
								<ToggleButton value="dark">Dark</ToggleButton>
								<ToggleButton value="hard">Hard</ToggleButton>
							</ToggleButtonGroup>
							<ToggleButtonGroup
								value={secondGenres}
								onChange={handleSecondGenres}
								aria-label="select genres"
								sx={{ width: "100%" }}
							>
								<ToggleButton value="melodic">
									Melodic
								</ToggleButton>
								<ToggleButton value="minimal">
									Minimal
								</ToggleButton>
								<ToggleButton value="raw">Raw</ToggleButton>
							</ToggleButtonGroup>
						</Box>
					</Box>
				</Box>
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
					<Typography>BPM Range</Typography>
					<Box sx={{ display: "flex", width: 300 }}>
						<Slider
							size="small"
							getAriaLabel={() => "Temperature range"}
							value={range}
							valueLabelDisplay="auto"
							onChange={handleChange}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "row",
						width: "100%",
					}}
				>
					<Typography>Release Year Range</Typography>
					<Box sx={{ display: "flex", width: 300 }}>
						<Slider
							size="small"
							getAriaLabel={() => "Temperature range"}
							value={range}
							valueLabelDisplay="auto"
							onChange={handleChange}
						/>
					</Box>
				</Box>
			</Box>

			<ActionButtons
				prev={{ onClick: props.previousStep }}
				next={{ onClick: props.nextStep }}
			/>
		</StepContainer>
	);
}
