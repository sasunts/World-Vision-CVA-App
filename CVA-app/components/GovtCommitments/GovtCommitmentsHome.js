import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text } from 'react-native';
import CommitmentOverview from './CommitmentOverview'
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi"

export default class GovtCommitmentsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commitmentData: []
        };
    }

    onGovtCommitmentsFetched = commitmentData => {
        this.setState(prevState => ({
            commitmentData: (prevState.commitmentData = commitmentData)
        }));
    };

    componentDidMount() {
        api.getGovtCommitmentsByDate(this.onGovtCommitmentsFetched);
    }

    renderRow({ item }) {
        return (
            <CommitmentOverview
                params={item}
            />
        )
    }

    render() {
        return (
            <ScrollView style={styles.commitmentHomeViewContainer}>
                <FlatList
                    data={this.state.commitmentData}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.commitmentTitle}
                />
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}
