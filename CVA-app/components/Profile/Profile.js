import React, { Component } from "react";
import { Text, TouchableOpacity, View, TextInput, Modal } from "react-native";
import Dialog from "react-native-dialog";
import { getUser } from "../../api/profileApi";
import DialogBox from "./DialogBox"
import firebase from "firebase";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../assets/styleSheet";

const myIcon = <Icon name="rocket" size={30} color="#900" />;

class Profile extends Component {
	constructor(props) {
		super(props);


		// this.handleChange = this.handleChange.bind(this);

		this.state = {
			name: "",
			email: "",
			age: "",
			sex: "",
			occupation: "",
			groupID: "",
			signedUp: false,
			userInfo: [],
			dialogVisible: false,
			editAge: "",
			editSex: "",
			editOccupation: ""
		};
	}

	onActionsFetched = userInfo => {
		this.setState(prevState => ({
			userInfo: (prevState.userInfo = userInfo)
		}));
	};

	async componentDidMount() {
		await getUser(firebase.auth().currentUser.email, this.onActionsFetched);

		this.setState({
			name: this.state.userInfo[0].name, email: this.state.userInfo[0].email,
			age: this.state.userInfo[0].age, sex: this.state.userInfo[0].sex,
			occupation: this.state.userInfo[0].occupation, groupID: this.state.userInfo[0].groupID
		})
	}

	submitChanges() {

	}

	cancelChanges() {

	}

	render() {
		// const editIcon = <Icon name="edit" size={18} />

		return (
			<View style={styles.container} >
				<View style={styles.commitmentOverviewContainer}>
					<Text style={styles.profileHeader}>{this.state.name}</Text>

					<Text style={styles.profileText}>Email: {this.state.email} </Text>

					<Text style={styles.profileText}>Age: {this.state.age}</Text>
					<DialogBox type={"age"} value={this.state.age}
						handleChange={(value) => this.setState({ age: value })}
					/>

					<Text style={styles.profileText}>Sex: {this.state.sex} </Text>
					<DialogBox type={"sex"} value={this.state.value}
						handleChange={(value) => this.setState({ sex: value })}
					/>

					<Text style={styles.profileText}>Occupation: {this.state.occupation}</Text>
					<DialogBox type={"occupation"} value={this.state.occupation}
						handleChange={(value) => this.setState({ occupation: value })}
					/>

					<Text style={styles.profileText}>Group ID: {this.state.groupID}</Text>

				</View>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => submitChanges()}
				>
					<Text style={styles.buttonText}>Save</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => cancelChanges()}
				>
					<Text style={styles.buttonText}>Cancel</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.profileLogoutButton}
					onPress={() => firebase.auth().signOut()}
				>
					<Text style={styles.buttonText}>Logout</Text>
				</TouchableOpacity>

			</View >
		);
	}

};

export default Profile;
