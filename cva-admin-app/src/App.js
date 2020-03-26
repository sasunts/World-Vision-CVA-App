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
			admin_users: []
		};
	}

	async getUser(email) {
		this.setState({ admin_users: [] });
		await db
			.collection("users")
			.doc(email)
			.get()
			.then(doc => {
				this.state.admin_users.push(doc.data());
			});
	}

	componentDidMount() {
		this.authListener();
	}
	authListener() {
		firebase.auth().onAuthStateChanged(async user => {
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
