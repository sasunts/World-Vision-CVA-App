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
			admin_users: []
		};
	}

	getUsers() {
		this.setState({ admin_users: [] });
		db.collection("users")
			.get()
			.then(snapshot => {
				snapshot.docs.forEach(doc => {
					this.state.admin_users.push(doc.data());
				});
			});
	}

	componentDidMount() {
		this.authListener();
	}
	authListener() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				// for (let i = 0; i < this.state.admin_users.length; i++) {
				// 	if (
				// 		user.email === this.state.admin_users[i].email &&
				// 		this.state.admin_users[i].type === "admin"
				// 	) {
				this.setState({ user });
				// 		return;
				// 	}

				// 	this.setState({ admin: false });
				// }
				// if (this.state.admin === false) {
				// 	alert("Not admin user");
				// 	// firebase.auth().signOut();
				// }
			} else {
				// alert("Not an admin user.");
				this.setState({ user: null });
				this.getUsers();
			}
		});
	}
	render() {
		return <div>{this.state.user ? <AdminPage /> : <LoginPage />}</div>;
	}
}

export default App;
