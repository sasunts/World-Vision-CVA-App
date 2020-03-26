import React, { Component } from "react";
import {
	Text,
	TouchableOpacity,
	View,
	TextInput,
	Image,
	Keyboard
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../../assets/styleSheet";

class SexScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sex: ""
		};
	}

	render() {
		const { params } = this.props.route;
		return (
			<View
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					paddingVertical: 10
				}}
			>
				<TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
					<Text style={styles.onBoardHeader}>
						Welcome to World Vision {"\n"}CVA App!
					</Text>
					<Text style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}>
						Please enter your sex:
					</Text>

					<TextInput
						placeholder="Sex..."
						style={styles.onBoardInput}
						value={this.state.sex}
						onChangeText={sex => this.setState({ sex })}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.onBoardButton}
					onPress={() =>
						this.props.navigation.navigate("OccupationScreen", {
							sex: this.state.sex,
							age: params.age,
							name: params.name
						})
					}
				>
					<Text style={styles.buttonText}>
						<Icon name="arrow-forward" size={25} />
					</Text>
				</TouchableOpacity>

				<Image
					source={require("../../assets/images/4_dots3.png")}
					style={{
						width: "15%",
						height: 50
					}}
				/>
			</View>
		);
	}
}

export default SexScreen;
