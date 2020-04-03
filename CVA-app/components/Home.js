import React, { Component } from "react";
import Loading from "../components/Loading";
import { getUser } from "../api/profileApi";
import firebase from "firebase";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Keyboard
} from "react-native";
import styles from "../assets/styleSheet";

class Home extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      firstLogin: null,
      userInfo: [],
      name: ""
    };
  }

  // Checks user info
  onActionsFetched = userInfo => {
    this.setState(prevState => ({
      userInfo: (prevState.userInfo = userInfo)
    }));
  };

  //See's if user is first time log in.
  async componentDidMount() {
    await getUser(firebase.auth().currentUser.email, this.onActionsFetched);

    if (this.state.userInfo[0].signedUp == true) {
      this.setState({ firstLogin: true });
    } else {
      this.setState({ firstLogin: false });
    }
  }

  // Onboarding process
  onChangeName() {
    if (this.state.name.trim() === "") {
      alert("Name required");
    } else {
      this.props.navigation.navigate("AgeScreen", { name: this.state.name });
    }
  }

  renderContent() {
    switch (this.state.firstLogin) {
      case false: // Case where user has onboarded
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
              <Text
                style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}
              >
                Please enter full your name:
              </Text>

              <TextInput
                placeholder="Name..."
                style={styles.onBoardInput}
                value={this.state.name}
                onChangeText={name => this.setState({ name })}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.onBoardButton}
              onPress={this.onChangeName}
            >
              <Text style={styles.buttonText}>
                <Icon name="arrow-forward" size={25} />
              </Text>
            </TouchableOpacity>

            <Image
              source={require("../assets/images/4_dots1.png")}
              style={{
                width: "15%",
                height: 50
              }}
            />
          </View>
        );
      case true: // Onboarding process
        return (
          <View style={styles.container}>
            <View style={styles.homeContainer}>
              <Text style={styles.heading}>Citizen, Voice, Action</Text>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("Action-Plan")}
              >
                <Text style={styles.buttonText}>Action Plan</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 20 }} />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  this.props.navigation.navigate("Govt-Commitments-Home")
                }
              >
                <Text style={styles.buttonText}>Govt Commitments</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 20 }} />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => this.props.navigation.navigate("ChatHome")}
              >
                <Text style={styles.buttonText}>Messaging</Text>
              </TouchableOpacity>
              <View style={{ paddingTop: 20 }}></View>
            </View>
          </View>
        );
      default:
        return <Loading />;
    }
  }

  render() {
    return this.renderContent();
  }
}
export default Home;
