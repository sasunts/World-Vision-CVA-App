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

class AgeScreen extends Component {
  constructor(props) {
    super(props);

    this.onChanged = this.onChanged.bind(this);

    this.state = {
      age: ""
    };
  }

  onChanged(text) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        alert("Please enter a number");
      }
    }
    this.setState({ age: newText });
  }

  render() {
    const { params } = this.props.route;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}>
          <Text style={styles.onBoardHeader}>
            Welcome to World Vision {"\n"}CVA App!
          </Text>
          <Text style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}>
            Please enter your age:
          </Text>

          <TextInput
            keyboardType={"numeric"}
            placeholder="Age..."
            style={styles.onBoardInput}
            value={this.state.age}
            onChangeText={text => this.onChanged(text)}
            maxLength={3}
          />
          <TouchableOpacity
            style={styles.onBoardButton}
            onPress={() =>
              this.props.navigation.navigate("SexScreen", {
                age: this.state.age,
                name: params.name
              })
            }
          >
            <Text style={styles.buttonText}>
              <Icon name="arrow-forward" size={25} />
            </Text>
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/4_dots2.png")}
            style={{
              width: "15%",
              height: 50,
              marginLeft: "44%"
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default AgeScreen;
