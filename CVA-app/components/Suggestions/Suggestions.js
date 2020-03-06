import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View } from 'react-native';
import SuggestionOverview from './SuggestionOverview'
import styles from "../../assets/styleSheet";
import * as api from "../../api/suggestionsApi"
import CreateSuggestion from './CreateSuggestion';

export default class Suggestions extends Component {
    constructor(props) {
        super(props);

        let commitment = this.props.commitment;

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
        api.getSuggestions(this.props.commitment.id, this.onSuggestionsFetched);
        console.log(this.props.commitment.id);
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
                {renderCreateSuggestion ? <CreateSuggestion commitment = {this.props.commitment}/> :
                    <View>
                        <Text>{this.props.commitment.title}</Text>
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
