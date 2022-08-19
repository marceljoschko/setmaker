import { Box, Button } from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

// A full width flex container for some steps of the wizard.
export const StepContainer = ({ children }) => (
	<Box
		sx={{
			display: "flex",
			flexDirection: "column",
			flex: "1 1 auto",
			justifyContent: "space-between",
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

// A div containing optional "back" and "next" buttons as well as the centered
// children. The props `prev` and `next` are objects with the follwing fields:
//
// - `onClick`: forwarded to the `<Button>`
// - `disabled`: forwarded to the `<Button>`
// - `label` (optional): the button label translation string. If not specified,
//   the label is 'back-button-label' or 'next-button-label'.
// - `danger` (optional): forwarded to the `<Button>`, default: `false`.
export function ActionButtons({ prev = null, next = null, children }) {
	return (
		<Box sx={{ alignItems: "end", minHeight: "40px" }}>
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
		</Box>
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
