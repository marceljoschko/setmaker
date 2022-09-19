import { StepContainer } from "../elements";
import { Button, Box } from "@mui/material";
import { useDispatch, useStudioState } from "../../../studio-state";

export default function StepSix(props) {
    const dispatch = useDispatch();
    const { newPlaylistId } = useStudioState();

    const tryAgain = () => {
        dispatch({
            type: "RESET",
        });
        props.firstStep();
    };

    const embedStr = `https://open.spotify.com/embed/playlist/${newPlaylistId}?utm_source=generator`;

    return (
        <StepContainer>
            <h1>Happy mixing :)</h1>
            <Box>
                <iframe
                    src={embedStr}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </Box>

            <Button variant="outlined" onClick={tryAgain}>
                Try Again
            </Button>
        </StepContainer>
    );
}
