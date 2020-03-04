import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi";
import Commitment from "./Commitment";

function CommitmentPage({ route }) {
    const passParams = route.params.details;
    // This screen gets all it's details through the route paramter

    return (
        <View>
            <Commitment commitment={passParams} />
        </View>
    );
}


export default CommitmentPage;
