/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { Flex } from "@theme-ui/components";
import { useState, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "./app-state";

import About from "./ui/about";
import Header from "./ui/header";
import SetMaker from "./ui/studio/page";

function App() {
	return (
		<Router basename={process.env.PUBLIC_URL || "/"}>
			<Provider>
				<Flex sx={{ flexDirection: "column", height: "100%" }}>
					<Header />
					<main
						sx={{
							flex: 1,
							display: "flex",
							flexDirection: "column",
							minHeight: "285px",
						}}
					>
						<Routes />
					</main>
				</Flex>
			</Provider>
		</Router>
	);
}

const Routes = () => {
	const [activeStep, updateActiveStep] = useState(0);
	return (
		<Fragment>
			<Switch>
				{/* <Route path="/login" exact>
					<Login />
				</Route> */}

				{/* <Route path="/about" exact>
					<About />
				</Route> */}

				<Route path="/" exact>
					<SetMaker
						activeStep={activeStep}
						updateActiveStep={updateActiveStep}
						userHasWebcam={userHasWebcam}
					/>
				</Route>
			</Switch>
		</Fragment>
	);
};

export default App;
