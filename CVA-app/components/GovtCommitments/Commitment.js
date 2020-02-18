import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../../assets/styleSheet';




function Commitment({ navigation, route }) {

    state = [];
    // This screen gets all it's details through the route paramter
    // TODO: remove test data
    if (route.params.details) {
        const details = route.params.details;
        state = {
            tableHead: ["Input Type", "Government Standards"],
            title: details?.commitmentTitle,
            description: details?.commitmentDescription,
            standards: details?.standards,
            testStandards: [
                [
                    "teachers:students",
                    "1:45"
                ],
                [
                    "chairs:students",
                    "1:1"
                ]
            ]
        };
    }

    return (
        <View>
            <View style={styles.standardsTableOuterContainer}>
                <View style={styles.standardsTableInnerContainer}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} />
                        <Rows data={state.testStandards} />
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

