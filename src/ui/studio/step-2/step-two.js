import { useStudioState, useDispatch } from "../../../studio-state";
import { ActionButtons, StepContainer } from "../elements";
import { Box, FormControl, Typography } from "@mui/material";
import NumberOfTracks from "./number-of-tracks";

export default function StepTwo(props) {
    const { numberOfTracks, importedTracks, minNumberOfTracks } =
        useStudioState();
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
                        mb: 3,
                    }}
                >
                    <Typography>
                        Imported {Object.keys(importedTracks).length} Tracks
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            mb: 3,
                        }}
                    ></Box>
                    <NumberOfTracks
                        dispatch={dispatch}
                        min={minNumberOfTracks}
                        numberOfTracks={numberOfTracks}
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
