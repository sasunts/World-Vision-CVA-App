import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View } from 'react-native';
import styles from "../../assets/styleSheet";

export default class CreateSuggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commitmentData: [],
            renderCreateCommitment: false
        };
    }

    render() {
        return (
            <View>
                <Text>
                    Hello!
                </Text>
            </View>
        );
    }
}