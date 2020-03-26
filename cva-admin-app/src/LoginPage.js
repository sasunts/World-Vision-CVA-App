import React, { Component } from "react";
import firebase from "./Firebase";
import {
	Button,
	Form,
	Container,
	Segment,
	Header,
	Message,
	Image
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
			<Container>
				<br />
				<Container className="Login-box">
					<Container style={{ width: 300 }}>
						<Image
							style={{ width: 300 }}
							src={require("./images/world_vision_logo.png")}
							alt="Logo"
						/>
						<Message hidden={this.state.notAdmin} color="red">
							<Message.Header>Not an admin user</Message.Header>
						</Message>
						<Segment placeholder padded>
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
						</Segment>
					</Container>
				</Container>
			</Container>
		);
	}
}

export default LoginPage;
