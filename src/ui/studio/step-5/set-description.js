import { Box, TextField } from "@mui/material";
import { getCurrentDate } from "../../../util";

export default function SetDescription(props) {
    let defaultText = "Techno Set created at " + getCurrentDate();

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
            <Box sx={{ display: "flex", width: 300 }}>
                <TextField
                    sx={{ flex: "1 0 auto", ml: 5 }}
                    id="outlined-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    defaultValue={defaultText}
                    onChange={(e) =>
                        props.dispatch({
                            type: "UPDATE_SET_DESCRIPTION",
                            payload: e.target.value,
                        })
                    }
                    value={props.setDescription}
                />
            </Box>
        </Box>
    );
}
