import { useStudioState, useDispatch } from "../../../studio-state";
import { ActionButtons, StepContainer } from "../elements";
import { Box, FormControl } from "@mui/material";
import NumberOfTracks from "./number-of-tracks";
import SubGenres from "./sub-genres";
import BpmRange from "./bpm-range";
import ReleaseYear from "./release-year";

export default function StepTwo(props) {
    const {
        numberOfTracks,
        subGenresFirst,
        subGenresSecond,
        bpmRange,
        releaseYear,
    } = useStudioState();
    const dispatch = useDispatch();

    return (
        <StepContainer>
            <h1>Fill in metadata</h1>
            <FormControl>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        width: "500px",
                    }}
                >
                    <NumberOfTracks
                        dispatch={dispatch}
                        numberOfTracks={numberOfTracks}
                    />
                    <SubGenres
                        dispatch={dispatch}
                        subGenresFirst={subGenresFirst}
                        subGenresSecond={subGenresSecond}
                    />
                    <BpmRange dispatch={dispatch} bpmRange={bpmRange} />
                    <ReleaseYear
                        dispatch={dispatch}
                        releaseYear={releaseYear}
                    />
                </Box>
                <ActionButtons
                    prev={{ onClick: props.previousStep }}
                    next={{ onClick: props.nextStep }}
                />
            </FormControl>
        </StepContainer>
    );
}
