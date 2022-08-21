import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";

export default function StepFive(props) {
	return (
		<StepContainer>
			<h1>Results</h1>
			<Button variant="outlined" onClick={props.nextStep}>
				Create Playlist Spotify
			</Button>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
