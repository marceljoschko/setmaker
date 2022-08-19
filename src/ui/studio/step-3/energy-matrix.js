import {
	Box,
	Slider,
	Typography,
	TextField,
	ToggleButtonGroup,
	ToggleButton,
} from "@mui/material";

import { useEffect, useRef } from "react";

export default function EnergyMatrix() {
	const svgRef = useRef();

	useEffect(() => {
		const svgRef = svgRef.current;
	}, []);

	return <svg ref={svgRef} width={500} height={350}></svg>;
}
