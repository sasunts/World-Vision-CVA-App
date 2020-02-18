import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../../assets/styleSheet';

function Commitment({ navigation, route }) {

    state = [];
    // This screen gets all it's details through the route paramter
    if (route.params.details) {
        const details = route.params.details;

        let fetchedStandards = [];
        // Need to format data properly for tables
        for (let i = 0; i < details.inputTypes.length; i++) 
            fetchedStandards.push([details.inputTypes[i], details.govtStandards[i]]);
        
        // Probably don't need to set it up as state like this 
        // just force of habit
        state = {
            tableHead: ["Input Type", "Government Standards"],
            title: details?.title,
            description: details?.description,
            standards: fetchedStandards,
        };
    }

    return (
        <View>
            <View style={styles.standardsTableOuterContainer}>
                <View style={styles.standardsTableInnerContainer}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} />
                        <Rows data={state.standards} />
                    </Table>
                </View>
            </View>
            <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text>View Actual Standards</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text>Create Standards Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Commitment;
