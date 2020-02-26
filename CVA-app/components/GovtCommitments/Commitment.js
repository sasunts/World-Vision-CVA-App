import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi";
import UpdateCommitment from "./UpdateCommitment";

export default class Commitment extends Component {
	constructor(props) {
		super(props);

		let commitment = this.props.commitment;

		if (commitment) {

			let fetchedStandards = [];
			// Need to format data properly for tables
			for (let i = 0; i < commitment.inputTypes.length; i++)
				fetchedStandards.push([commitment.inputTypes[i], commitment.govtStandards[i]]);

			// Probably don't need to set it up as state like this
			// just force of habit
			this.state = {
				id: commitment?.id,
				tableHead: ["Input Type", "Government Standards"],
				title: commitment?.title,
				description: commitment?.description,
				standards: fetchedStandards,
				renderEditor: false
			};
		}
	}

	render() {
		return (
			<ScrollView>
				{this.state.renderEditor ? <UpdateCommitment commitment={this.props.commitment} /> :
					<View>
						<View style={styles.standardsTableOuterContainer}>
							<View style={styles.standardsTableInnerContainer}>
								<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
									<Row data={this.state.tableHead} />
									<Rows data={this.state.standards} />
								</Table>
							</View>
						</View>
						<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
							<TouchableOpacity style={styles.buttonContainer}>
								<Text>View Actual Standards</Text>
							</TouchableOpacity>
							
						</View>

						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => { this.setState({ renderEditor: true }) }}>
							<Text>Edit Commitment</Text>
						</TouchableOpacity>
					</View>}
			</ScrollView>
		);
	}
}


