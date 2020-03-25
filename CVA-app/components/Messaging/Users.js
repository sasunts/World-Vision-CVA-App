import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import * as RootNavigation from "../../routes/RootNavigation";
import styles from "../../assets/styleSheet";
import firebaseSvc from "../../api/chatApi";
import firebase from "firebase";


class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usersData: []
        };
    }

    onUsersFetched = usersData => {
        this.setState(prevState => ({
            usersData: (prevState.usersData = usersData)
        }));
    };

    componentDidMount() {
        firebaseSvc.getUsers(firebase.auth().currentUser.email, usersData => {
            this.setState({ usersData: usersData });
        });
        console.log("Users Fetched");
      }

    renderRow({item}){
        return(
            <View>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {RootNavigation.navigate("Chats", {chat: item.email})}}
                >
                    <Text style={styles.buttonText}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
      

    render() {
        return (
            <ScrollView style={styles.container} >
                
                <FlatList
                    data={this.state.usersData}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.id}
                />

            </ScrollView >
        );
    }

};

export default Users;
