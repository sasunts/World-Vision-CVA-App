import React, { Component } from "react";
import firebase, { db } from "./Firebase";
import * as admin from "firebase-admin";
import {
	Grid,
	Button,
	Form,
	Container,
	Segment,
	Header,
	Modal,
	List,
	Icon
} from "semantic-ui-react";
import "./App.css";

class AdminPage extends Component {
	constructor() {
		super();
		this.signup = this.signup.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		// this.readUser = this.readUser.bind(this);

		this.state = {
			email: "",
			password: "",
			name: "",
			userType: "",
			group: "",
			auth_users: []
		};

		this.getUsers();
		this.readUser();

		// admin.initializeApp({
		// 	credential: admin.credential.applicationDefault(),
		// 	databaseURL: "https://test-50175.firebaseio.com"
		// });

		// const user = admin.auth.get_user_by_email("sasuntsv@tcd.ie");
		// admin.auth.delete_user(user.uid);

		// admin
		// 	.auth()
		// 	.deleteUser("7dBnzAFOJYN5fy8hAkOOmxVjI9b2")
		// 	.then(function() {
		// 		console.log("Successfully deleted user");
		// 	})
		// 	.catch(function(error) {
		// 		console.log("Error deleting user:", error);
		// 	});

		// firebase
		// 	.auth()
		// 	.fetchProvidersForEmail(email)
		// 	.then(providers => {
		// 		if (providers.length === 0) {
		// 			// this email hasn't signed up yet
		// 		} else {
		// 			// has signed up
		// 		}
		// 	});

		// console.log(firebase.auth().fetchSignInMethodsForEmail("sasuntsv@tcd.ie"));
		// user = firebase.auth.EmailAuthProvider.credential(
		// 	"sasuntsa@tcd.ie",
		// 	"test1234"
		// );
	}
	readUser = async user => {
		// user = await firebase.auth().fetchSignInMethodsForEmail("sasuntsa@tcd.ie");
		// user = await firebase.auth.EmailAuthProvider.credential(
		// 	"sasuntsa@tcd.ie",
		// 	"test1234"
		// )
		// user = firebase
		// 	.auth()
		// 	.getUser("WzfB479IYeSVX4wk0aAMDicObn03")
		// console.log(user);
		// console.log(user.i);
		// user
		// .delete()
		// .then(function() {
		// User deleted.
		// })
		// .catch(function(error) {
		// An error happened.
		// });
		// user = admin.auth.get_user_by_email("sasuntsv@tcd.ie");
		// admin.auth.delete_user(user.uid);
	};

	getUsers() {
		let users = [];
		db.collection("users")
			.get()
			.then(snapshot => {
				snapshot.docs.forEach(doc => {
					users.push(doc.data());
				});
				this.setState({ auth_users: users });
			});
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	async signup(e) {
		let isError = null;
		e.preventDefault();
		await firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch(error => {
				alert(error);
				isError = 1;
			});
		if (isError == null) {
			db.collection("users")
				.doc(this.state.email)
				.set({
					name: this.state.name,
					email: this.state.email,
					group: this.state.group,
					type: this.state.userType
				});
			alert("User added");
			this.getUsers();
		}
	}

	deleteUser(email) {
		db.collection("users")
			.doc(email)
			.delete();

		// this.getUsers();

		const deleteUser = firebase.functions().httpsCallable("deleteUser");

		deleteUser({ email: "test@tcd.ie" }).then(res => {
			console.log(res.data);
		});
	}

	render() {
		return (
			<div>
				<br />
				<div className="admin-box">
					<div>
						<img
							style={{ width: 300, marginLeft: 210, marginBottom: 20 }}
							src={require("./images/world_vision_logo.png")}
							alt="Logo"
						/>
					</div>

					<Container style={{ width: 300 }}>
						<Segment padded placeholder>
							<Grid textAlign="center">
								<Grid.Column>
									<Form onSubmit={this.signup}>
										<Header>Add new user</Header>
										<Form.Input
											icon="user"
											iconPosition="left"
											name="name"
											type="name"
											placeholder="Enter name"
											onChange={this.handleChange}
										/>
										<Form.Input
											icon="at"
											iconPosition="left"
											name="email"
											type="email"
											placeholder="Enter email"
											onChange={this.handleChange}
										/>
										<Form.Input
											icon="lock"
											iconPosition="left"
											name="password"
											type="password"
											placeholder="Enter password"
											onChange={this.handleChange}
										/>
										<Form.Input
											icon="group"
											iconPosition="left"
											name="group"
											type="group"
											placeholder="Enter group"
											onChange={this.handleChange}
										/>
										<Form.Dropdown
											placeholder="Select User Type"
											fluid
											selection
											name="dropdown"
											options={[
												{ key: "admin", text: "admin", value: "admin" },
												{ key: "user", text: "user", value: "user" }
											]}
											onChange={(e, { value }) => (this.state.userType = value)}
										/>
										<Button content="Add" primary />
									</Form>
								</Grid.Column>
							</Grid>
						</Segment>
						<Button floated="right" onClick={() => firebase.auth().signOut()}>
							Sign out
						</Button>
						<Modal
							trigger={
								<Button floated="left" color="blue">
									View users
								</Button>
							}
							centered={false}
						>
							<Modal.Header>
								<Modal.Actions>
									<Button icon color="red" floated="right">
										<Icon name="close" />
									</Button>
								</Modal.Actions>
								List of authenticated users
							</Modal.Header>

							<Modal.Content>
								<Modal.Description>
									{this.state.auth_users.map(user => (
										<List divided verticalAlign="middle">
											<List.Item>
												<List.Content>
													<p>
														<i aria-hidden="true" className="user icon"></i>
														<b>{user.name} </b>
														{user.email} {user.type} {user.group}
														<Button
															floated="right"
															icon="trash alternate"
															onClick={() => {
																this.deleteUser(user.email);
															}}
														></Button>
													</p>
												</List.Content>
											</List.Item>
											<List.Item></List.Item>
										</List>
									))}
								</Modal.Description>
							</Modal.Content>
						</Modal>
						<ul id="user-list"></ul>
					</Container>
				</div>
			</div>
		);
	}
}

export default AdminPage;
