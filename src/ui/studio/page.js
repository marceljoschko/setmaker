import Steps from "./steps";

import StepOne from "./step-1/step-one";
import StepTwo from "./step-2/step-two";
import StepThree from "./step-3/step-three";
import StepFour from "./step-4/step-four";
import StepFive from "./step-5/step-five";

export default function Wizard({ activeStep, updateActiveStep }) {
	return (
		<Steps activeStep={activeStep} updateActiveStep={updateActiveStep}>
			<StepOne />
			<StepTwo />
			<StepThree />
			<StepFour />
			<StepFive />
		</Steps>
	);
}
