import React, { Component } from "react";
import firebase, { db } from "./Firebase";
import {
	Grid,
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
	Divider
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
			email: "",
			password: "",
			name: "",
			userType: "",
			groupID: "",
			auth_users: [],
			group_users: []
		};

		this.getUsers();
	}

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

	// getUserGroups(groupID) {
	// 	let users = [];
	// 	db.collection("groups")
	// 		.doc("group" + groupID)
	// 		.get()
	// 		.then(doc => {
	// 			users.push(doc.data().email);
	// 		});
	// 	this.setState({ group_users: users });
	// }

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	async signup(e) {
		let tmp = [];

		let isError = null;
		e.preventDefault();

		// await this.getUserGroups(this.state.groupID);

		// this.state.group_users[0].forEach(user => {
		// 	tmp.push(user);
		// });

		// console.log("group:", this.state.group_users);
		// console.log("VFS:", this.state.group_users[0]);
		// console.log("tmp", tmp);

		const addUser = firebase.functions().httpsCallable("addUser");
		await addUser({
			email: this.state.email,
			password: this.state.password
		}).then(res => {
			// alert(res);
			// console.log(res.data);
		});
		// .catch(error => {
		// 	alert(error);
		// 	isError = 1;
		// });
		if (isError == null) {
			db.collection("users")
				.doc(this.state.email)
				.set({
					name: this.state.name,
					email: this.state.email,
					groupID: this.state.groupID,
					type: this.state.userType
				});
			// db.collection("groups")
			// 	.doc("group" + this.state.groupID)
			// 	.set({
			// 		email: tmp
			// 	});
			// alert("User added");
			this.setState({ showMessage: false });
			this.timeout = setTimeout(() => {
				this.setState({ showMessage: true });
			}, 2000);
			this.getUsers();
		}
	}

	async deleteUser(email) {
		await db
			.collection("users")
			.doc(email)
			.delete();

		this.getUsers();

		const deleteUser = firebase.functions().httpsCallable("deleteUser");
		deleteUser({ email: email });
	}

	updateSearch(event) {
		this.setState({ search: event.target.value.substr(0, 20) });
	}

	onchange = e => this.setState({ search: e.target.value });

	state = { openModal: false, isOpen: false };

	openModal = () => this.setState({ openModal: true });
	closeModal = () => this.setState({ openModal: false });

	handlePopupOpen = () => {
		this.setState({ isOpen: true });
	};

	handlePopupClose = () => {
		this.setState({ isOpen: false });
	};

	render() {
		let filteredUsers = this.state.auth_users.filter(user => {
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
						<Message hidden={this.state.showMessage} color="green">
							<Message.Header>User added</Message.Header>
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
										{ key: "user", text: "user", value: "user" }
									]}
									onChange={(e, { value }) => (this.state.userType = value)}
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
										{/* <Segment inverted color="grey"> */}
										<Input
											type="text"
											fluid
											size="big"
											icon="search"
											placeholder="Search user..."
											value={this.state.search}
											onChange={this.updateSearch.bind(this)}
										/>
										{/* </Segment> */}
										<Modal.Content scrolling>
											<Divider />
											{filteredUsers.map(user => (
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
																{/* <Popup
															wide
															open={this.state.isOpen}
															onClose={this.handleClose}
															onOpen={this.handleOpen}
															position="left center"
															trigger={
																<Button
																	floated="right"
																	icon="trash alternate"
																	onClick={this.handlePopupOpen}
																></Button>
															}
															on="click"
														>
															<Grid divided columns="equal">
																<Grid.Column>
																	<Popup
																		trigger={
																			<Button
																				color="green"
																				content="Confirm"
																				fluid
																				onClick={() => {
																					this.deleteUser(user.email);
																				}}
																			/>
																		}
																		content="Are you sure?"
																		position="top center"
																		size="tiny"
																		inverted
																	/>
																</Grid.Column>
																<Grid.Column>
																	<Button
																		color="red"
																		content="Cancel"
																		fluid
																		onClick={this.handlePopupClose}
																	/>
																</Grid.Column>
															</Grid>
														</Popup> */}
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
