import { Box, Button, Paper } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

// A full width flex container for some steps of the wizard.
export const StepContainer = ({ children }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
            justifyContent: "start",
            alignItems: "center",
            height: "88vh",
            width: "100%",
            p: 3,
            pt: [2, 2, 3],
            "& > h1": {
                textAlign: "center",
                fontSize: ["24px", "27px", "32px"],
            },
        }}
    >
        {children}
    </Box>
);

export const ActionButtons = ({ prev = null, next = null }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                backgroundImage: "",
                backgroundColor: "#121212",
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
            }}
        >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                {prev && (
                    <Box sx={{ flex: "1 1 0", textAlign: "left" }}>
                        <Button
                            sx={{
                                whiteSpace: "nowrap",
                            }}
                            onClick={prev.onClick}
                            disabled={prev.disabled}
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                            <p>Back</p>
                        </Button>
                    </Box>
                )}

                {next && (
                    <Box sx={{ flex: "1 1 0", textAlign: "right" }}>
                        <Button
                            sx={{
                                whiteSpace: "nowrap",
                                "& svg": { mr: 0, ml: 2 },
                            }}
                            onClick={next.onClick}
                            disabled={next.disabled}
                            title="Next"
                        >
                            <p>Next</p>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </Button>
                    </Box>
                )}
            </Box>
        </Paper>
    );
};
