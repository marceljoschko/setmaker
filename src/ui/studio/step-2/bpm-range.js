import { Box, Typography, Slider } from "@mui/material";

export default function SetName(props) {
    const handleChange = (event, newValue) => {
        props.dispatch({
            type: "UPDATE_BPM_RANGE",
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
                    value={props.bpmRange}
                    valueLabelDisplay="auto"
                    onChange={handleChange}
                    min={120}
                    step={1}
                    max={170}
                />
            </Box>
        </Box>
    );
}
