import React, { Component } from "react";
import { TouchableOpacity, View, TextInput } from "react-native";
import Dialog from "react-native-dialog";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../assets/styleSheet";


class DialogBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            edit: this.props.value
        };
    }

    handleChange = () => {
        this.setState({ dialogVisible: false, age: this.state.edit });
    }

    onChangeAge(text) {
        let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                alert("Please enter a number");
                this.setState({ edit: "" });
            }
        }
        this.setState({ edit: newText });
    }

    inputType() {
        console.log(this.props.type)
        if (this.props.type === "age") {
            return (
                <TextInput
                    keyboardType={"numeric"}
                    placeholder="Edit..."
                    type="text"
                    style={styles.input}
                    onChangeText={(text) => this.onChangeAge(text)}
                    maxLength={3}
                />
            )
        } else {
            return (
                <TextInput
                    placeholder="Edit..."
                    type="text"
                    style={styles.input}
                    onChangeText={edit => this.setState({ edit })}
                />
            )
        }
    }

    render() {
        return (
            <View >
                <TouchableOpacity style={{ marginLeft: "50%" }} onPress={() => { this.setState({ dialogVisible: true }) }}>
                    <Icon name="edit" size={18} />
                </TouchableOpacity>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Edit {this.props.type}:</Dialog.Title>
                    {this.inputType()}
                    <Dialog.Button label="Cancel" onPress={() => { this.setState({ dialogVisible: false }) }} />
                    <Dialog.Button label="Submit"
                        onPress={() => { this.props.handleChange(this.state.edit), this.setState({ dialogVisible: false }) }}
                    />
                </Dialog.Container>
            </View >
        );
    }
};

export default DialogBox;
