import React from "react";
import { GiftedChat } from "react-native-gifted-chat";

export default class Example extends React.Component {
    state = {
        messages: []
    };

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: "This chat is aids Tom",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native"
                    }
                }
            ]
        });
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1
                }}
            />
        );
    }
}
