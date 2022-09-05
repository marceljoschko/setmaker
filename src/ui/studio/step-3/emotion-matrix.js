import {
    Box,
    Slider,
    Typography,
    TextField,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";
import React from "react";

export default function EmotionMatrix(props) {
    const handleChange = (event, newValue) => {
        props.dispatch({
            type: "UPDATE_EMOTION_MATRIX",
            payload: newValue,
        });
    };
    return (
        <Box sx={{ display: "flex" }}>
            <ToggleButtonGroup
                value={props.emotionMatrix}
                onChange={handleChange}
            >
                <ToggleButton value="aroused">Aroused</ToggleButton>
                <ToggleButton value="excited">Excited</ToggleButton>
                <ToggleButton value="happy">Happy</ToggleButton>
                <ToggleButton value="sad">Sad</ToggleButton>
                <ToggleButton value="angry">Angry</ToggleButton>
                <ToggleButton value="sleepy">Sleepy</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
