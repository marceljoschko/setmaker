import { BottomNavigation, Box, Button, Paper } from "@mui/material";

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
        <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
            <BottomNavigation
                variant="fixed"
                sx={{ display: "flex", alignItems: "end", minHeight: "40px" }}
            >
                <Box sx={{ flex: "1 1 0", textAlign: "left" }}>
                    {prev && (
                        <Button
                            sx={{
                                whiteSpace: "nowrap",
                            }}
                            onClick={prev.onClick}
                            disabled={prev.disabled}
                            title="Back"
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                            <p>Back</p>
                        </Button>
                    )}
                </Box>

                <Box sx={{ flex: "1 1 0", textAlign: "right" }}>
                    {next && (
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
                    )}
                </Box>
            </BottomNavigation>
        </Paper>
    );
};
