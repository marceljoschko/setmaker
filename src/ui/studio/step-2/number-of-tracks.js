import { Box, Typography, Slider } from "@mui/material";

export default function NumberOfTracks(props) {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
                width: "100%",
                mb: 2,
            }}
        >
            <Typography>Number of Tracks</Typography>
            <Box sx={{ display: "flex", width: 300 }}>
                <Slider
                    size="small"
                    value={props.numberOfTracks}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={(e) =>
                        props.dispatch({
                            type: "UPDATE_NUMBER_OF_TRACKS",
                            payload: e.target.value,
                        })
                    }
                    min={props.min}
                    step={1}
                    max={40}
                />
            </Box>
        </Box>
    );
}
