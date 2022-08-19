import Steps from "./steps";

import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";

export default function Wizard({ activeStep, updateActiveStep }) {
	return (
		<Steps activeStep={activeStep} updateActiveStep={updateActiveStep}>
			<StepOne />
			<StepTwo />
			<StepThree />
		</Steps>
	);
}
