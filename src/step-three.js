import { ActionButtons, StepContainer } from "./elements";

export default function StepThree(props) {
	return (
		<StepContainer>
			<h1>step three</h1>
			<ActionButtons prev={{ onClick: props.previousStep }} />
		</StepContainer>
	);
}
