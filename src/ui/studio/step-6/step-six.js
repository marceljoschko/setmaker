import { StepContainer } from "../elements";
import { Button } from "@mui/material";
import { useDispatch } from "../../../studio-state";

export default function StepSix(props) {
    const dispatch = useDispatch();

    const tryAgain = () => {
        dispatch({
            type: "RESET",
        });
        props.firstStep();
    };

    return (
        <StepContainer>
            <h1>Happy mixing :)</h1>
            <Button variant="outlined" onClick={tryAgain}>
                Try Again
            </Button>
        </StepContainer>
    );
}
