/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import React from "react";
import ReactDOM from "react-dom/client";

import theme from "./theme";
import App from "./app";
import { Provider } from "./app-state";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Provider>
				<App />
			</Provider>
		</ThemeProvider>
	</React.StrictMode>
);
