import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi";
import Commitment from "./Commitment";
import { useNavigation } from '@react-navigation/native';

function CommitmentPage({ route }) {
    const passParams = route.params.details;
    // This screen gets all it's details through the route paramter
    const navigation = useNavigation();


    return (
        <View>
            <Commitment commitment={passParams} />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {
                    navigation.navigate("Report", { passParams });
                }}>
                <Text>Create Standards Report</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Suggestions')}>
                <Text style={styles.buttonContainer} >Suggestions</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => { handleDeleteCommitment(passParams.id); }}>
                <Text>Delete Commitment</Text>
            </TouchableOpacity>
        </View>
    );
}

const handleDeleteCommitment = (id) => {
    api.deleteGovtCommitment(id, () => console.log("Document Deleted Successfully"));
};

export default CommitmentPage;
