import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/styleSheet'
import { useNavigation } from '@react-navigation/native';


const CommitmentOverview = ({
    params,
}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.commitmentOverviewContainer}
            onPress={() => {
                console.log("Go to commitment");
                navigation.navigate("Commitment");
            }}>
            <Text>{params.commitmentTitle}</Text>
            <Text>{params.commitmentDescription}</Text>
            <Text>Score Overview: {params.commitmentScoreOverview}</Text>
        </TouchableOpacity>
    );}

export default CommitmentOverview;
