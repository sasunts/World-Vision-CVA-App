import * as React from "react";
import {

	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Button,
	Image

} from "react-native";
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
				<View style={{ paddingTop: 20 }} />
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigation.navigate("Govt-Commitments-Home")}
				>
					<Text style={styles.buttonText}>Govt Commitments</Text>
				</TouchableOpacity>
				<View style={{ paddingTop: 20 }} />
				<TouchableOpacity
					style={styles.buttonContainer}
					onPress={() => navigation.navigate("ChatHome")}
				>
					<Text style={styles.buttonText}>Messaging</Text>
				</TouchableOpacity>
				<View style={{ paddingTop: 20 }}></View>
			</View>
		</View >
	);
}
export default Home;
