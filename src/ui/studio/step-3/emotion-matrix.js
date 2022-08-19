import {
	Box,
	Slider,
	Typography,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";

export default function EmotionMatrix() {
	return (
		<Box sx={{ display: "flex" }}>
			<ToggleButtonGroup>
				<ToggleButton value="aroused">Aroused</ToggleButton>
				<ToggleButton value="excited">Excited</ToggleButton>
				<ToggleButton value="Happy">Happy</ToggleButton>

				<ToggleButton value="sad">Sad</ToggleButton>
				<ToggleButton value="angry">Angry</ToggleButton>
				<ToggleButton value="sleepy">Sleepy</ToggleButton>
			</ToggleButtonGroup>
		</Box>
	);
}
