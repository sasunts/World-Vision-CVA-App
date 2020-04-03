import React, { Component } from "react";
import LoginPage from "./LoginPage";
import AdminPage from "./AdminPage";
import firebase from "./Firebase";
import { db } from "./Firebase";
import "semantic-ui-css/semantic.min.css";

class App extends Component {
	constructor() {
		super();

		this.authListener = this.authListener.bind(this);

		this.state = {
			user: null,
			notAdmin: true,
			admin_users: [],
		};
	}

	// recieves user data from Firebase
	async getUser(email) {
		this.setState({ admin_users: [] });
		await db
			.collection("users")
			.doc(email)
			.get()
			.then((doc) => {
				this.state.admin_users.push(doc.data());
			});
	}

	// gets user data and stores into local storage *fixes refresh issue
	componentWillMount() {
		localStorage.getItem("user") &&
			this.setState({
				user: JSON.parse(localStorage.getItem("user")),
			});
	}

	// sets user data into local storage on page update
	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem("user", JSON.stringify(nextState.user));
	}

	// listen to auth on page load
	componentDidMount() {
		this.authListener();
	}

	// check if auth state has changed (signed in/out) and check if user is admin
	authListener() {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				await this.getUser(user.email);

				if (this.state.admin_users[0].type === "admin") {
					this.setState({ notAdmin: true });
					this.setState({ user });
				} else {
					firebase.auth().signOut();
					this.setState({ notAdmin: false });
				}
			} else {
				this.setState({ user: null });
			}
		});
	}

	// renders Admin page if user is admin else stays on login page
	render() {
		return (
			<div>
				{this.state.user ? (
					<AdminPage />
				) : (
					<LoginPage notAdmin={this.state.notAdmin} />
				)}
			</div>
		);
	}
}

export default App;
