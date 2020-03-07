import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "./Auth.js";
import firebase from "./Firebase.js";
import {
	Grid,
	Button,
	Form,
	Segment,
	Container,
	Header
} from "semantic-ui-react";
import "./App.css";

const LoginPage = ({ history }) => {
	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await firebase
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push("/");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	const admin_users = [
		"sasuntsa@tcd.ie",
		"sasuntsv@tcd.ie",
		"aidan.sinnott@wveu.org",
		"oreskovt@tcd.ie",
		"wisniowt@tcd.ie",
		"leonarr1@tcd.ie"
	];

	if (currentUser) {
		for (let i = 0; i < admin_users.length; i++) {
			if (firebase.auth().currentUser.email === admin_users[i]) {
				return <Redirect to="/admin" />;
			}
		}
	}

	return (
		<div>
			<h1 style={{ textAlign: "center" }}>World Vision CVA Admin</h1>
			<div className="Login-box">
				<Container style={{ width: 300 }}>
					<Segment placeholder>
						<Grid>
							<Grid.Column>
								<Form onSubmit={handleLogin}>
									<Header textAlign="center">Admin Login</Header>
									<Form.Input
										icon="user"
										iconPosition="left"
										label="Email"
										name="email"
										type="email"
									/>
									<Form.Input
										icon="lock"
										iconPosition="left"
										label="Password"
										name="password"
										type="password"
									/>
									<Button content="Login" primary type="submit" />
								</Form>
							</Grid.Column>
						</Grid>
					</Segment>
				</Container>
			</div>
		</div>
	);
};

export default withRouter(LoginPage);
