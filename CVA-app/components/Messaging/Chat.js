import React, { Component, useCallback } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import firebaseSvc from "../../api/chatApi";

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        userId: "",
        userName: "",
        messages: []
    };

    get getUser() {
        return {
            name: "Tomasz Wisniowski",
            email: firebase.auth().currentUser.email,
            id: firebase.auth().currentUser.uid,
            _id: firebase.auth().currentUser.uid // need for gifted-chat
        };
        // const userEmail = firebase.auth().currentUser.email;
        // const userUid = firebase.auth().currentUser.uid;
        // firebaseSvc.userName(userEmail, userName => {
        //     console.log("This is: ", userName.name);
        //     console.log(userEmail);
        //     console.log(userUid);
        //     console.log(userUid);
        //     return {
        //         name: userName,
        //         // email: userEmail,
        //         // id: userUid,
        //         _id: userUid // need for gifted-chat
        //     };
        // });
    }

    componentDidMount() {
        firebaseSvc.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={firebaseSvc.send}
                user={this.getUser}
            />
        );
    }

    // componentWillUnmount() {
    //     firebaseSvc.refOff();
    // }
}
