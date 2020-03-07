import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";
import "semantic-ui-css/semantic.min.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<div>
					<Route path="/" exact component={LoginPage} />
					<PrivateRoute path="/admin" component={AdminPage} />
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
