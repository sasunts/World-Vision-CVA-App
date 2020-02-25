import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";
import CreateCommitment from "../GovtCommitments/CreateCommitment";
import * as api from "../../api/govtCommitmentsApi";

function Commitment({ navigation, route }) {
	let state = [];
	const passParams = route.params.details;
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
			id: details?.id,
			tableHead: ["Input Type", "Government Standards"],
			title: details?.title,
			description: details?.description,
			standards: fetchedStandards,
			renderEditor: false
		};
	}

	return (
		<ScrollView>
			{state.renderEditor ? <CreateCommitment props={passParams} /> :
				<View>
					<View style={styles.standardsTableOuterContainer}>
						<View style={styles.standardsTableInnerContainer}>
							<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
								<Row data={state.tableHead} />
								<Rows data={state.standards} />
							</Table>
						</View>
					</View>
					<View style={{ flexDirection: "row", justifyContent: "space-around" }}>
						<TouchableOpacity style={styles.buttonContainer}>
							<Text>View Actual Standards</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() => {
								navigation.navigate("Report", { passParams });
							}}
						>
							<Text>Create Standards Report</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => { handleDeleteCommitment(navigation, state); }}>
						<Text>Delete Commitment</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => { handleUpdateCommitment(state); }}>
						<Text>Edit Commitment</Text>
					</TouchableOpacity>
				</View>}
		</ScrollView>
	);
}

const handleDeleteCommitment = (navigation, state) => {
	api.deleteGovtCommitment(state.id, () => console.log("Document Deleted Successfully"));
	navigation.goBack();
};

const handleUpdateCommitment = (state) => {
	console.log(state)
	state.renderEditor = true;
	console.log(state.renderEditor)
}

export default Commitment;
