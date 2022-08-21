import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";

export default function StepSix(props) {
	return (
		<StepContainer>
			<h1>Happy mixing :)</h1>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
