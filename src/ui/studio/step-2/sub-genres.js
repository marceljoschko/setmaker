import {
    Box,
    Typography,
    ToggleButtonGroup,
    ToggleButton,
} from "@mui/material";

export default function SubGenres(props) {
    const handleChange = (event, newValue) => {
        props.dispatch({
            type: "UPDATE_SUB_GENRES",
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
            <Typography>Subgenres</Typography>
            <Box sx={{ display: "flex", width: 300 }}>
                <Box>
                    <ToggleButtonGroup
                        value={props.subGenres}
                        exclusive
                        onChange={handleChange}
                        aria-label="select genres"
                        sx={{ mb: 1 }}
                    >
                        <ToggleButton value="Acid Techno">Acid</ToggleButton>
                        <ToggleButton value="Dark Techno">Dark</ToggleButton>
                        <ToggleButton value="Hard Techno">Hard</ToggleButton>
                        <ToggleButton value="Melodic Techno">
                            Melodic
                        </ToggleButton>
                        <ToggleButton value="Minimal Techno">
                            Minimal
                        </ToggleButton>
                        <ToggleButton value="Raw Techno">Raw</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>
        </Box>
    );
}
