import React, { Component, useCallback } from "react";
import firebase from "firebase";
import "firebase/firestore";
import { GiftedChat } from "react-native-gifted-chat"; // 0.3.0

import firebaseSvc from "../../api/chatApi";

export default class Chat extends Component {
    constructor(props) {
        super(props);

        let chat = this.props.chat;

        this.state = {
            userId: "",
            userName: "",
            messages: []
        };
    }

    get getUser() {
        console.log(this.state.userName);
        return {
            name: this.state.userName,
            email: firebase.auth().currentUser.email,
            id: firebase.auth().currentUser.uid,
            _id: firebase.auth().currentUser.uid // need for gifted-chat
        };
    }

    componentDidMount() {
        const userEmail = firebase.auth().currentUser.email;
        firebaseSvc.userName(userEmail, userName => {
            this.setState({ userName: userName.name });
        });

        console.log(this.props.chat);
        firebaseSvc.refOn(1, this.props.chat, userEmail, message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message)
            }))
        );
    }

    render() {

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => firebaseSvc.send(messages, this.props.chat, firebase.auth().currentUser.email)}
                user={this.getUser}
            />
        );
    }

    componentWillUnmount() {
        firebaseSvc.refOn(0, whatever => console.log(whatever));
    }
}
