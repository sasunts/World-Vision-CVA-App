import firebase from "firebase";
import "firebase/firestore";
import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { sendMessage, getMessages, fetchUserInfo } from "../../api/chatApi";

export default class Example extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userId: "",
            userName: "",
            messages: []
        };
    }

    componentDidMount() {
        const userEmail = firebase.auth().currentUser.email;
        fetchUserInfo(userEmail, userInfo => {
            this.setState({ userName: userInfo[0].name });
        });
        getMessages(messages => {
            console.log(messages);
            this.setState({ messages: messages });
        });
    }

    onSend(messages) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
        sendMessage(messages[0], whatEver => console.log(whatEver));
    }

    render() {
        return (
            <GiftedChat
                loadEarlier={true}
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: firebase.auth().currentUser.uid,
                    name: this.state.userName
                }}
            />
        );
    }
}
