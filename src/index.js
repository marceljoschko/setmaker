/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, ThemeProvider } from "theme-ui";
import { Global } from "@emotion/core";
import React from "react";
import ReactDOM from "react-dom/client";

import GlobalStyle from "./style/global-style";
import theme from "./theme";

import App from "./app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<Global styles={GlobalStyle}>
				<App />
			</Global>
		</ThemeProvider>
	</React.StrictMode>
);
