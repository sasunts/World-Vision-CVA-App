import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Text, View } from 'react-native';
import CommitmentOverview from './CommitmentOverview'
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi"
import CreateCommitment from './CreateCommitment';

export default class GovtCommitmentsHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commitmentData: [],
            renderCreateCommitment: false
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
        let { commitmentData, renderCreateCommitment } = this.state;
        return (
            <ScrollView style={styles.commitmentHomeViewContainer} >
                {renderCreateCommitment ? <CreateCommitment /> :
                    <View>
                        <FlatList
                            data={commitmentData}
                            renderItem={this.renderRow}
                            keyExtractor={item => item.id}
                        />
                        <TouchableOpacity style={styles.addButton}
                            onPress={() => { this.setState({ renderCreateCommitment: true }) }}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>}
            </ScrollView>
        );
    }
}
