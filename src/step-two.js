import { useAppState } from "./app-state";
import { ActionButtons, StepContainer } from "./elements";

export default function StepTwo(props) {
	const { importedTracks } = useAppState();
	return (
		<StepContainer>
			<h1>step two</h1>
			<ActionButtons
				prev={{ onClick: props.previousStep }}
				next={{ onClick: props.nextStep }}
			/>
		</StepContainer>
	);
}
