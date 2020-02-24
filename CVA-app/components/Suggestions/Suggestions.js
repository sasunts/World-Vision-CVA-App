import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View } from 'react-native';
import SuggestionOverview from './SuggestionOverview'
import styles from "../../assets/styleSheet";
import * as api from "../../api/suggestionsApi"
import CreateSuggestion from './CreateSuggestion';

export default class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestionData: [],
            renderCreateSuggestion: false
        };
    }

    onSuggestionsFetched = suggestionData => {
        this.setState(prevState => ({
            suggestionData: (prevState.suggestionData = suggestionData)
        }));
    };

    componentDidMount() {
        api.getSuggestionsByDate(this.onSuggestionsFetched);
    }

    renderRow({ item }) {
        return (
            <SuggestionOverview
                params={item}
            />
        )
    }

    render() {
        let { suggestionData, renderCreateSuggestion } = this.state;
        return (
            <ScrollView style={styles.commitmentHomeViewContainer}>
                {renderCreateSuggestion ? <CreateSuggestion /> :
                    <View>
                        <FlatList
                            data={suggestionData}
                            renderItem={this.renderRow}
                            keyExtractor={item => item.id}
                        />
                        <TouchableOpacity style={styles.addButton}
                            onPress={() => { this.setState({ renderCreateSuggestion: true }) }}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>}
            </ScrollView>
        );
    }
}
