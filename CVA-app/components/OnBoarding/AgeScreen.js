import React, { Component } from "react";
import { Text, TouchableOpacity, View, TextInput, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from "../../assets/styleSheet";

class AgeScreen extends Component {
    constructor(props) {
        super(props);



        this.state = {
            age: ""
        };
    }

    render() {
        const { params } = this.props.route;
        return (
            <View style={styles.container} >
                <Text style={styles.onBoardHeader}>Welcome to World Vision {"\n"}CVA App!</Text>
                <Text style={{ textAlign: "center", marginTop: 150, fontSize: 25 }}>Please enter your age:</Text>

                <TextInput
                    placeholder="Age..."
                    style={styles.onBoardInput}
                    value={this.state.age}
                    onChangeText={age => this.setState({ age })}
                />
                <TouchableOpacity
                    style={styles.onBoardButton}
                    onPress={() => this.props.navigation.navigate("SexScreen", { age: this.state.age, name: params.name })}
                >
                    <Text style={styles.buttonText}><Icon name="arrow-forward" size={25} /></Text>
                </TouchableOpacity>

                <Image
                    source={require("../../assets/images/4_dots2.png")}
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

export default AgeScreen;
