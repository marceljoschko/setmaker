import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";

export default function StepSix(props) {
	return (
		<StepContainer>
			<h1>Happy mixing :)</h1>
			<Button variant="outlined" onClick={props.firstStep}>
				Try Again
			</Button>
		</StepContainer>
	);
}
