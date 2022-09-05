import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import { Provider } from "./studio-state";

import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <Provider>
                <CssBaseline />
                <App />
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
