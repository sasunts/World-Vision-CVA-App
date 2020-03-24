import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import firebase from "firebase";
import styles from "../../assets/styleSheet";

class NameScreen extends Component {
	constructor(props) {
		super(props);

		this.updateProfile = this.updateProfile.bind(this);

		this.state = {
			name: "",
			age: "",
			sex: "",
			occupation: ""
		};
	}

	async componentDidMount() {
		const { params } = this.props.route;
		this.setState({
			name: params.name,
			age: params.age,
			sex: params.sex,
			occupation: params.occupation
		});
	}

	async updateProfile() {
		await firebase
			.firestore()
			.collection("users")
			.doc(firebase.auth().currentUser.email)
			.set(
				{
					name: this.state.name,
					age: this.state.age,
					sex: this.state.sex,
					occupation: this.state.occupation,
					signedUp: true
				},
				{ merge: true }
			);
		this.props.navigation.reset({
			index: 0,
			routes: [
				{
					name: "Home"
				}
			]
		});
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.onBoardHeader}>Information Screen</Text>

				<TouchableOpacity
					style={{
						width: 100,
						marginTop: 170,
						marginLeft: 130,
						backgroundColor: "#ff7800",
						padding: 15,
						borderRadius: 8,
						margin: 5,
						shadowColor: "#000000",
						shadowOpacity: 0.3,
						shadowRadius: 1,
						shadowOffset: {
							height: 1,
							width: 1
						}
					}}
					onPress={this.updateProfile}
				>
					<Text style={styles.buttonText}>Done</Text>
				</TouchableOpacity>
			</ScrollView>
		);
	}
}

export default NameScreen;
