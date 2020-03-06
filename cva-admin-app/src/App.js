import React from "react";
import { Route } from "react-router-dom";
import LoginPage from "./LoginPage";

function App() {
	return (
		<div>
			<Route path="/" component={LoginPage} />
		</div>
	);
}

export default App;
