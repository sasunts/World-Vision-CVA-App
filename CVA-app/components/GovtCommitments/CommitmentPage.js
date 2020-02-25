import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";
import CreateCommitment from "../GovtCommitments/CreateCommitment";
import * as api from "../../api/govtCommitmentsApi";
import Commitment from "./Commitment";

function CommitmentPage({ route }) {
    let state = [];
    const passParams = route.params.details;
    // This screen gets all it's details through the route paramter

    return (
        <View>
            <Commitment commitment={passParams} />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => { handleDeleteCommitment(passParams.id); }}>
                <Text>Delete Commitment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => console.log(passParams)}></TouchableOpacity>
        </View>
    );
}

const handleDeleteCommitment = (id) => {
    api.deleteGovtCommitment(id, () => console.log("Document Deleted Successfully"));
};

const handleUpdateCommitment = (state) => {
    console.log(state)
    state.renderEditor = true;
    console.log(state.renderEditor)
}

export default CommitmentPage;
