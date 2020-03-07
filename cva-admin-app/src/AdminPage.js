import React, { useCallback } from "react";
import { withRouter } from "react-router";
import * as admin from "firebase-admin";
import firebase from "./Firebase";
import {
	Grid,
	Button,
	Form,
	Container,
	Segment,
	Header
} from "semantic-ui-react";
import "./App.css";

const AdminPage = ({ history }) => {
	const handleSignUp = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await firebase
					.auth()
					.createUserWithEmailAndPassword(email.value, password.value);
				history.push("/");
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	// admin.initializeApp();

	// function listAllUsers(nextPageToken) {
	// 	// List batch of users, 1000 at a time.

	// 	firebase
	// 		.auth()
	// 		.listUsers(1000, nextPageToken)
	// 		.then(function(listUsersResult) {
	// 			listUsersResult.users.forEach(function(userRecord) {
	// 				console.log("user", userRecord.toJSON());
	// 			});
	// 			if (listUsersResult.pageToken) {
	// 				// List next batch of users.
	// 				listAllUsers(listUsersResult.pageToken);
	// 			}
	// 		})
	// 		.catch(function(error) {
	// 			console.log("Error listing users:", error);
	// 		});
	// }
	// // Start listing users from the beginning, 1000 at a time.
	// listAllUsers();

	return (
		<div>
			<h1 style={{ textAlign: "center" }}>World Vision CVA Admin</h1>
			<div className="Login-box">
				<Container style={{ width: 300 }}>
					<Segment padded>
						<Grid textAlign="center">
							<Grid.Column>
								<Form onSubmit={handleSignUp}>
									<Header>Add new user</Header>
									<Form.Input
										icon="user"
										iconPosition="left"
										name="email"
										type="email"
										placeholder="Enter email"
									/>
									<Form.Input
										icon="lock"
										iconPosition="left"
										name="password"
										type="password"
										placeholder="Enter password"
									/>
									<Button content="Add" primary />
								</Form>
							</Grid.Column>
						</Grid>
					</Segment>
					<Button floated="right" onClick={() => firebase.auth().signOut()}>
						Sign out
					</Button>
					<Button floated="left" color="blue">
						View users
					</Button>
				</Container>
			</div>
		</div>
	);
};

export default AdminPage;
