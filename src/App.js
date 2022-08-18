/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./ui/header";
import SetMaker from "./ui/setmaker/page";
import Home from "./ui/home";
import Login from "./ui/login";
import PrivateRoute from "./ui/private-route";

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL || "/"}>
			<Fragment>
				<Routes>
					<Route exact path="/" element={<PrivateRoute />}>
						<Route exact path="/" element={<Header />} />
					</Route>
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;
