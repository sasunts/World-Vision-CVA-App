import React, { Component, useCallback } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import firebaseSvc from "../../api/chatApi";

export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            userName: "",
            messages: []
        };
    }

    get getUser() {
        const userEmail = firebase.auth().currentUser.email;
        const userUid = firebase.auth().currentUser.uid;
        firebaseSvc.userName(userEmail, userName => {
            return {
                name: userName,
                email: userEmail,
                id: userUid,
                _id: userUid // need for gifted-chat
            };
        });

        // console.log("This is: ", userName);

        // return {
        //     name: userName,
        //     email: userEmail,
        //     id: firebaseSvc.uid,
        //     _id: firebaseSvc.uid // need for gifted-chat
        // };
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

    componentDidMount() {
        firebaseSvc.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }
    componentWillUnmount() {
        firebaseSvc.refOff();
    }
}
