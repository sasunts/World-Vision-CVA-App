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

    render() {
        return (
            <View >
                <TouchableOpacity style={{ marginLeft: "50%" }} onPress={() => { this.setState({ dialogVisible: true }) }}>
                    <Icon name="edit" size={18} />
                </TouchableOpacity>
                <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Edit {this.props.type}:</Dialog.Title>
                    <TextInput
                        placeholder="Edit..."
                        type="text"
                        style={styles.input}
                        onChangeText={edit => this.setState({ edit })}
                    />
                    <Dialog.Button label="Cancel" onPress={() => { this.setState({ dialogVisible: false }) }} />
                    <Dialog.Button label="Accept"
                        onPress={() => { this.props.handleChange(this.state.edit), this.setState({ dialogVisible: false }) }}
                    />
                </Dialog.Container>
            </View >
        );
    }
};

export default DialogBox;
