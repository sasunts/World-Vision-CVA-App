import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View } from 'react-native';
import styles from "../../assets/styleSheet";
import CreateSuggestion from "./CreateSuggestion"

export default class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.addButton}
                    onPress={() => { <CreateSuggestion/> }}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}