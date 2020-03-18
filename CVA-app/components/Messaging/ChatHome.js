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
                    onPress={() => RootNavigation.navigate("Chat")}
                >
                    <Text style={styles.buttonText}>Global chat</Text>
                </TouchableOpacity>

            </ScrollView >
        );
    }

};

export default Profile;
