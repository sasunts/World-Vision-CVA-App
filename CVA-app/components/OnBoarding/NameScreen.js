import React, { Component } from "react";
import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../assets/styleSheet";

class NameScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.onBoardHeader}>Welcome to World Vision {"\n"}CVA App!</Text>
                <Text style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}>Please enter full your name:</Text>

                <TextInput
                    placeholder="Name..."
                    style={styles.onBoardInput}
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                />
                <TouchableOpacity
                    style={styles.onBoardButton}
                    onPress={() => this.props.navigation.navigate("AgeScreen", { name: this.state.name })}
                >
                    <Text style={styles.buttonText}><Icon name="arrow-forward" size={25} /></Text>
                </TouchableOpacity>

                <Image
                    source={require("../../assets/images/4_dots1.png")}
                    style={{
                        width: "15%",
                        height: 50,
                        marginLeft: "44%"
                    }}
                />

            </View >
        );
    }
};

export default NameScreen;
