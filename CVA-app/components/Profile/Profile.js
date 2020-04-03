import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as RootNavigation from "../../routes/RootNavigation";
import { getUser } from "../../api/profileApi";
import DialogBox from "./DialogBox";
import firebase from "firebase";
import styles from "../../assets/styleSheet";

class Profile extends Component {
	constructor(props) {
		super(props);

		this.submitChanges = this.submitChanges.bind(this);

		this.state = {
			name: "",
			email: "",
			age: "",
			sex: "",
			occupation: "",
			groupID: "",
			userInfo: [],
			dialogVisible: false,
			editAge: "",
			editSex: "",
			editOccupation: "",
		};
	}

	// recieves user information from profileApi
	async componentDidMount() {
		await getUser(firebase.auth().currentUser.email, this.onActionsFetched);

		this.setState({
			name: this.state.userInfo[0].name,
			email: this.state.userInfo[0].email,
			age: this.state.userInfo[0].age,
			sex: this.state.userInfo[0].sex,
			occupation: this.state.userInfo[0].occupation,
			groupID: this.state.userInfo[0].groupID,
		});
	}

	onActionsFetched = (userInfo) => {
		this.setState((prevState) => ({
			userInfo: (prevState.userInfo = userInfo),
		}));
	};

	// stores changed data into the database on form submission
	async submitChanges() {
		await firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.email)
			.set(
				{
					age: this.state.age,
					sex: this.state.sex,
					occupation: this.state.occupation,
				},
				{ merge: true }
			);
		RootNavigation.navigate("Home");
	}

	// renders profile UI
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.commitmentOverviewContainer}>
					<Text style={styles.profileHeader}>{this.state.name}</Text>

					<Text style={styles.profileText}>Email: {this.state.email} </Text>

					<Text style={styles.profileText}>Age: {this.state.age}</Text>
					<DialogBox
						type={"age"}
						value={this.state.age}
						handleChange={(value) => this.setState({ age: value })}
					/>

					<Text style={styles.profileText}>Sex: {this.state.sex} </Text>
					<DialogBox
						type={"sex"}
						value={this.state.value}
						handleChange={(value) => this.setState({ sex: value })}
					/>

					<Text style={styles.profileText}>
						Occupation: {this.state.occupation}
					</Text>
					<DialogBox
						type={"occupation"}
						value={this.state.occupation}
						handleChange={(value) => this.setState({ occupation: value })}
					/>

					<Text style={styles.profileText}>Group ID: {this.state.groupID}</Text>
				</View>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={this.submitChanges}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => RootNavigation.navigate("Home")}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Profile;
