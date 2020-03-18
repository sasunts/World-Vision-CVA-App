import * as React from "react";
import firebase from "firebase";
import {
	View,
	Text,
	TouchableOpacity,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../assets/styleSheet";

const Home = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<View style={styles.homeContainer}>
				<Text style={styles.heading}>Citizen, Voice, Action</Text>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigation.navigate("Action-Plan")}
				>
					<Text style={styles.buttonText}>Action Plan</Text>
				</TouchableOpacity>
				<View style={{ paddingTop: 20 }}></View>
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigation.navigate("Govt-Commitments-Home")}
				>
					<Text style={styles.buttonText}>Govt Commitments</Text>
				</TouchableOpacity>
				<View style={{ paddingTop: 20 }}></View>
			</View>
		</View >
	);
};

export default Home;
