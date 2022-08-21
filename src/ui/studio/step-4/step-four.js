import { ActionButtons, StepContainer } from "../elements";
import { Button } from "@mui/material";

export default function StepFour(props) {
	return (
		<StepContainer>
			<Button variant="outlined" onClick={props.nextStep}>
				Create Set
			</Button>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
