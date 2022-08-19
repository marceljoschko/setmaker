import { ActionButtons, StepContainer } from "../elements";

export default function StepFour(props) {
	return (
		<StepContainer>
			<h1>step Four</h1>
			<ActionButtons
				prev={{ onClick: props.previousStep }}
				next={{ onClick: props.nextStep }}
			/>
		</StepContainer>
	);
}
