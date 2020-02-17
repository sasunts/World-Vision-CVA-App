import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';




export default class Commitment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["Input Type", "Government Standards"],
            testStandards: [
                {
                    inputType: "teachers:students",
                    govtStandard: "1:45"
                },
                {
                    inputType: "chairs:students",
                    govtStandard: "1:1"
                }
            ]
        };
    }

    render() {
        const state = this.state;
        return (
            <View>

                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} />
                    <Rows data={state.testStandards} />
                </Table>
            </View>
        );
    }
}
