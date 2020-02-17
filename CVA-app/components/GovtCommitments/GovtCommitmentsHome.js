import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native';
import CommitmentOverview from './CommitmentOverview'
import styles from "../../assets/styleSheet";

export default class GovtCommitmentsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    list = [
        {
            commitmentTitle: "Commitment test title 0",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
        {
            commitmentTitle: "Commitment test title 1",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
        {
            commitmentTitle: "Commitment test title 2",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
        {
            commitmentTitle: "Commitment test title 3",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
        {
            commitmentTitle: "Commitment test title 4",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
        {
            commitmentTitle: "Commitment test title 5",
            commitmentDescription: "Commitmnt test description, brief description of what this commitment is",
            commitmentScoreOverview: "TBD what goes here or if we want it at all"
        },
    ]

    

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
                    data={this.list}
                    renderItem={this.renderRow}
                    keyExtractor={item => item.commitmentTitle}
                />
                <TouchableOpacity style={styles.addButton}></TouchableOpacity>
            </ScrollView>
        );
    }
}
