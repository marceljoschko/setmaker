/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import Steps from "./steps";

export default function Wizard({ activeStep, updateActiveStep }) {
	return (
		<Steps
			activeStep={activeStep}
			updateActiveStep={updateActiveStep}
		></Steps>
	);
}
