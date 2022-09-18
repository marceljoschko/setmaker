import { ActionButtons, StepContainer } from "../elements";
import { Box } from "@mui/material";
import { useStudioState, useDispatch } from "../../../studio-state";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-plugin-dragdata";
import { dispatch } from "d3";
Chart.register(...registerables);

export default function StepThree(props) {
    const dispatch = useDispatch();
    const { energyPoints, numberOfTracks } = useStudioState();
    const canvasRef = useRef();
    let myChart;

    const config = {
        responsive: true,
        backgroundColor: "#90caf9",

        plugins: {
            legend: {
                display: false,
            },
            dragData: {
                round: 0,
                dragX: true,
                showTooltip: true,
                onDragStart: function (e, datasetIndex, index, value) {},
                onDrag: function (e, datasetIndex, index, value) {
                    e.target.style.cursor = "grabbing";
                },
                onDragEnd: function (e, datasetIndex, index, value) {
                    e.target.style.cursor = "default";
                    sortData();
                    resetFirstAndLast();
                    myChart.update();
                },
            },
        },
        scales: {
            x: {
                display: false,
                type: "linear",
                min: 1,
                max: 600,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                z: -1,
            },
            y: {
                display: false,
                min: 1,
                max: 400,
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                z: -1,
            },
        },
    };
    const data = energyPoints;

    const sortData = () => {
        data.sort((a, b) => a.x - b.x);
    };

    const getCursorPosition = (canvas, event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        data.push({ x: x, y: Math.abs(400 - y) });
        sortData();
        myChart.update();
    };

    const resetFirstAndLast = () => {
        data[0].x = 1;
        data[data.length - 1].x = 600;
    };

    useEffect(() => {
        const ctx = canvasRef.current.getContext("2d");

        if (!myChart) {
            myChart = new Chart(ctx, {
                type: "line",
                data: {
                    datasets: [{ data }],
                },
                options: config,
            });
        }
    });

    const handleNextStep = () => {
        generateEnergyMap();
        dispatch({ type: "UPDATE_ENERGY_POINTS", payload: data });
        props.nextStep();
    };

    const valueAt = (x) => {
        let index = data.findIndex((o) => o.x >= x);
        let prev = data[index - 1];
        let next = data[index];
        if (prev && next) {
            let slope = (next.y - prev.y) / (next.x - prev.x);
            return prev.y + (x - prev.x) * slope;
        }
    };

    const generateEnergyMap = () => {
        const energyMap = [];
        let x = 600 / (numberOfTracks - 1);
        for (let i = 1; i < numberOfTracks; i++) {
            energyMap.push((valueAt(x) / 400).toFixed(2));
            x += 600 / (numberOfTracks - 1);
        }
        console.log(energyMap);
        dispatch({ type: "UPDATE_ENERGY_MAP", payload: energyMap });
    };

    return (
        <StepContainer>
            <h1>Energy Matrix</h1>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    width: "500px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "column",
                    }}
                >
                    <canvas
                        ref={canvasRef}
                        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                        width="600"
                        height="400"
                        onClick={(e) => getCursorPosition(canvasRef.current, e)}
                    ></canvas>
                    <Box
                        sx={{
                            mb: 2,
                        }}
                    />
                </Box>
            </Box>
            <ActionButtons
                prev={{ onClick: props.previousStep }}
                next={{ onClick: handleNextStep }}
            />
        </StepContainer>
    );
}
