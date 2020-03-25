import React, { Component } from "react";
import { Text, TouchableOpacity, ScrollView } from "react-native";
import * as RootNavigation from "../../routes/RootNavigation";
import styles from "../../assets/styleSheet";


class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
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

            </ScrollView >
        );
    }

};

export default Profile;
