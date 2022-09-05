import { Box, Typography, Slider } from "@mui/material";

export default function ReleaseYear(props) {
    const handleChange = (event, newValue) => {
        props.dispatch({
            type: "UPDATE_RELEASE_YEAR",
            payload: newValue,
        });
    };

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
            <Typography>BPM Range</Typography>
            <Box sx={{ display: "flex", width: 300 }}>
                <Slider
                    size="small"
                    value={props.releaseYear}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    min={1974}
                    step={1}
                    max={2022}
                />
            </Box>
        </Box>
    );
}
