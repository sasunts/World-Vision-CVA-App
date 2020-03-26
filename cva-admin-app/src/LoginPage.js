import React, { Component } from "react";
import firebase from "./Firebase";
import {
	Grid,
	Button,
	Form,
	Container,
	Segment,
	Header,
	Message
} from "semantic-ui-react";
import "./App.css";

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {
			notAdmin: this.props.notAdmin,
			email: "",
			password: "",
			admin_users: []
		};

		firebase.auth().signOut();
	}

	componentWillReceiveProps(newProps) {
		this.setState({ notAdmin: newProps.notAdmin });
		this.timeout = setTimeout(() => {
			this.setState({ notAdmin: true });
		}, 2000);
	}

	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}

	login(e) {
		e.preventDefault();
		firebase
			.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch(error => {
				alert(error);
			});
	}

	render() {
		return (
			<div>
				<br />
				<div className="Login-box">
					<img
						style={{ width: 300, marginLeft: 210, marginBottom: 20 }}
						src={require("./images/world_vision_logo.png")}
						alt="Logo"
					/>
					<Container style={{ width: 300 }}>
						<Message hidden={this.state.notAdmin} color="red">
							<Message.Header>Not an admin user</Message.Header>
						</Message>
						<Segment placeholder padded>
							<Grid>
								<Grid.Column>
									<Form onSubmit={this.login}>
										<Header textAlign="center">Admin Login</Header>
										<Form.Input
											icon="user"
											iconPosition="left"
											label="Email"
											name="email"
											type="email"
											onChange={this.handleChange}
										/>
										<Form.Input
											icon="lock"
											iconPosition="left"
											label="Password"
											name="password"
											type="password"
											onChange={this.handleChange}
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
	}
}

export default LoginPage;
