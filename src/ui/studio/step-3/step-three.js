import { ActionButtons, StepContainer } from "../elements";
import {
	Box,
	Slider,
	Typography,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";

import EmotionMatrix from "./emotion-matrix";
import EnergyMatrix from "./energy-matrix";

export default function StepThree(props) {
	return (
		<StepContainer>
			<h1>Set the vibe</h1>
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
						flexDirection: "column",
					}}
				>
					<EmotionMatrix />
					<Box
						sx={{
							mb: 2,
						}}
					/>
				</Box>
			</Box>
			<ActionButtons
				prev={{ onClick: props.previousStep }}
				next={{ onClick: props.nextStep }}
			/>
		</StepContainer>
	);
}
