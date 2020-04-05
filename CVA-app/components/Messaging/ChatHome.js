import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import * as RootNavigation from "../../routes/RootNavigation";
import styles from "../../assets/styleSheet";
import firebaseSvc from "../../api/chatApi";
import firebase from "firebase";


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            groupID: ""
        };
    }

    componentDidMount(){
        const userEmail = firebase.auth().currentUser.email;
        firebaseSvc.groupID(userEmail, groupID => {
            this.setState({ groupID: groupID });
        });
    }

    render() {
        return (
            <ScrollView style={styles.container} >
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => RootNavigation.navigate("Chats", {chat: "global"} )}
                >
                    <Text style={styles.buttonText}>Global chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => RootNavigation.navigate("Users")}
                >
                    <Text style={styles.buttonText}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {RootNavigation.navigate("Chats", {chat: this.state.groupID})}}
                >
                    <Text style={styles.buttonText}>CVA group chat</Text>
                </TouchableOpacity>

            </ScrollView >
        );
    }

};

export default Profile;
