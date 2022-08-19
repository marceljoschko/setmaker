import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app";
import { Provider } from "./app-state";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<Provider>
				<CssBaseline />
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
