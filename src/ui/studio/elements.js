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

export function ActionButtons({ prev = null, next = null, children }) {
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
                                ...(prev.danger === true
                                    ? { variant: "buttons.danger" }
                                    : { variant: "buttons.text" }),
                            }}
                            onClick={prev.onClick}
                            disabled={prev.disabled}
                            danger={prev.danger || false}
                            title="Back"
                        >
                            <FontAwesomeIcon icon={faCaretLeft} />
                            <p>Back</p>
                        </Button>
                    )}
                </Box>
                <Box>{children}</Box>
                <Box sx={{ flex: "1 1 0", textAlign: "right" }}>
                    {next && (
                        <Button
                            sx={{
                                whiteSpace: "nowrap",
                                "& svg": { mr: 0, ml: 2 },
                                ...(next.danger === true
                                    ? { variant: "buttons.danger" }
                                    : {}),
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
}

export const OptionButton = ({ children, label, onClick }) => {
    return (
        <Button variant="outlined" onClick={onClick} title={label}>
            <div sx={{ fontSize: 4 }}>{label}</div>
            {children}
        </Button>
    );
};
