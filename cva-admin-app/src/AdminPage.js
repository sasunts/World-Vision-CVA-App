import React, { Component } from "react";
import firebase, { db } from "./Firebase";
import {
	Button,
	Form,
	Container,
	Segment,
	Header,
	Message,
	Image,
	Modal,
	List,
	Icon,
	Popup,
	Input,
	Divider,
} from "semantic-ui-react";
import "./App.css";

class AdminPage extends Component {
	constructor() {
		super();
		this.signup = this.signup.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.getUsers = this.getUsers.bind(this);
		this.deleteUser = this.deleteUser.bind(this);

		this.state = {
			search: "",
			showMessage: true,
			messageColor: "",
			message: "",
			errorMessage: false,
			email: "",
			password: "",
			name: "",
			userType: "",
			groupID: "",
			auth_users: [],
		};

		this.getUsers();
	}

	// receives "users" collection from Firebase
	getUsers() {
		let users = [];
		db.collection("users")
			.get()
			.then((snapshot) => {
				snapshot.docs.forEach((doc) => {
					users.push(doc.data());
				});
				this.setState({ auth_users: users });
			});
	}

	// sets inputs when changed
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	// calls addUser cloud function in Firebase and adds users if they don't already exist
	// also adds the user to the "users" collection in Firebase Firesotre
	// ensures that all input fields are entered else gives error messages accordingly
	async signup(e) {
		if (this.state.name.trim() === "") {
			this.setState({
				showMessage: false,
				message: "Name required",
				messageColor: "red",
			});
		} else if (this.state.email.trim() === "") {
			this.setState({
				showMessage: false,
				message: "Email required",
				messageColor: "red",
			});
		} else if (this.state.password.trim() === "") {
			this.setState({
				showMessage: false,
				message: "Password required",
				messageColor: "red",
			});
		} else if (this.state.groupID.trim() === "") {
			this.setState({
				showMessage: false,
				message: "Group ID required",
				messageColor: "red",
			});
		} else if (this.state.userType.trim() === "") {
			this.setState({
				showMessage: false,
				message: "User type required",
				messageColor: "red",
			});
		} else {
			let isError = null;
			e.preventDefault();

			const addUser = firebase.functions().httpsCallable("addUser");
			await addUser({
				email: this.state.email,
				password: this.state.password,
			}).then((res) => {
				if (res.data !== "user added") {
					isError = 1;
					this.setState({
						showMessage: false,
						message: res.data.errorInfo.message,
						messageColor: "red",
					});
				}
			});
			if (isError == null) {
				db.collection("users").doc(this.state.email).set({
					name: this.state.name,
					email: this.state.email,
					groupID: this.state.groupID,
					type: this.state.userType,
					signedUp: false,
				});
				this.setState({
					showMessage: false,
					message: "User added",
					messageColor: "green",
				});
				this.timeout = setTimeout(() => {
					this.setState({ showMessage: true });
				}, 3000);
				this.getUsers();
			}
		}
	}

	// calls deletUser cloud function in Firebase and deletes the user
	// also deletes the user in the "users" collection in Firebase Firesotre
	async deleteUser(email) {
		await db.collection("users").doc(email).delete();

		this.getUsers();

		const deleteUser = firebase.functions().httpsCallable("deleteUser");
		deleteUser({ email: email });
	}

	// updates search query
	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	onchange = (e) => this.setState({ search: e.target.value });

	// handles modal open and close
	state = { openModal: false, isOpen: false };

	openModal = () => this.setState({ openModal: true });
	closeModal = () => this.setState({ openModal: false });

	// renders Admin opage UI
	render() {
		let filteredUsers = this.state.auth_users.filter((user) => {
			return (
				user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
			);
		});
		const { openModal } = this.state;
		return (
			<Container>
				<br />
				<Container className="admin-box">
					<Container style={{ textAlign: "center", width: 300 }}>
						<Image
							style={{ width: 300 }}
							src={require("./images/world_vision_logo.png")}
							alt="Logo"
						/>
						<Message
							hidden={this.state.showMessage}
							color={this.state.messageColor}
						>
							<Message.Header>{this.state.message}</Message.Header>
						</Message>
						<Segment padded placeholder>
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
									name="groupID"
									type="groupID"
									placeholder="Enter groupID"
									onChange={this.handleChange}
								/>
								<Form.Dropdown
									placeholder="Select User Type"
									fluid
									selection
									name="dropdown"
									options={[
										{ key: "admin", text: "admin", value: "admin" },
										{ key: "user", text: "user", value: "user" },
									]}
									onChange={(e, { value }) =>
										this.setState({ userType: value })
									}
								/>
								<Button content="Add" primary />
							</Form>
						</Segment>
						<Button floated="right" onClick={() => firebase.auth().signOut()}>
							Sign out
						</Button>
						<Modal
							open={openModal}
							trigger={
								<Button floated="left" color="blue" onClick={this.openModal}>
									View users
								</Button>
							}
							centered={false}
						>
							<Modal.Header>
								<Modal.Actions>
									<Button
										icon
										color="red"
										floated="right"
										onClick={this.closeModal}
									>
										<Icon name="close" />
									</Button>
								</Modal.Actions>
								List of authenticated users
							</Modal.Header>

							<Modal.Content>
								<Segment placeholder>
									<Modal.Description>
										<Input
											type="text"
											fluid
											size="big"
											icon="search"
											placeholder="Search user..."
											value={this.state.search}
											onChange={this.updateSearch.bind(this)}
										/>
										<Modal.Content scrolling>
											<Divider />
											{filteredUsers.map((user) => (
												<List divided verticalAlign="middle">
													<List.Item>
														<List.Content>
															<p style={{ marginBottom: 15, fontSize: 14 }}>
																<i aria-hidden="true" className="user icon"></i>
																<b>{user.name} </b>
																<br />
																<Popup
																	trigger={
																		<Button
																			floated="right"
																			icon="trash alternate"
																			onClick={() => {
																				this.deleteUser(user.email);
																			}}
																		/>
																	}
																	content="Are you sure?"
																	position="left center"
																	size="tiny"
																	inverted
																/>
																<b>Email:</b> {user.email} <br />
																<b>User type:</b> {user.type} <br />
																<b>Group ID: </b>
																{user.groupID}
															</p>
														</List.Content>
													</List.Item>
													<List.Item></List.Item>
												</List>
											))}
										</Modal.Content>
									</Modal.Description>
								</Segment>
							</Modal.Content>
						</Modal>

						<ul id="user-list"></ul>
					</Container>
				</Container>
			</Container>
		);
	}
}

export default AdminPage;
