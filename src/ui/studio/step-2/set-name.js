import { Box, Typography, TextField } from "@mui/material";

export default function SetName(props) {
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
			<Typography>Set Name</Typography>
			<Box sx={{ display: "flex", width: 300 }}>
				<TextField
					required
					id="standard-basic"
					variant="standard"
					onChange={(e) =>
						props.dispatch({
							type: "UPDATE_SET_NAME",
							payload: e.target.value,
						})
					}
					value={props.setName}
				/>
			</Box>
		</Box>
	);
}
