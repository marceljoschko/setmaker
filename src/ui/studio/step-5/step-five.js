import { ActionButtons, StepContainer } from "../elements";

export default function StepFive(props) {
	return (
		<StepContainer>
			<h1>step Five</h1>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
