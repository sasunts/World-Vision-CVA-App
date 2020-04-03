import React, { Component } from "react";
import {
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Image,
	Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../assets/styleSheet";

class OccupationScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			occupation: "",
		};
	}

	// renders Occupation screen UI
	render() {
		const { params } = this.props.route;
		return (
			<View
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					paddingVertical: 10,
				}}
			>
				<TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
					<Text style={styles.onBoardHeader}>
						Welcome to World Vision {"\n"}CVA App!
					</Text>
					<Text style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}>
						Please enter your occupation:
					</Text>

					<TextInput
						placeholder="Occupation..."
						style={styles.onBoardInput}
						value={this.state.occupation}
						onChangeText={(occupation) => this.setState({ occupation })}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.onBoardButton}
					onPress={() =>
						this.props.navigation.navigate("InformationScreen", {
							occupation: this.state.occupation,
							sex: params.sex,
							age: params.age,
							name: params.name,
						})
					}
				>
					<Text style={styles.buttonText}>
						<Icon name="arrow-forward" size={25} />
					</Text>
				</TouchableOpacity>

				<Image
					source={require("../../assets/images/4_dots4.png")}
					style={{
						width: "15%",
						height: 50,
					}}
				/>
			</View>
		);
	}
}

export default OccupationScreen;
