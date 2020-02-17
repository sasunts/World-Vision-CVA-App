import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/styleSheet'

const CommitmentOverview = ({
    params,
}) => (
        <TouchableOpacity style={styles.commitmentOverviewContainer} >
            <Text>{params.commitmentTitle}</Text>
            <Text>{params.commitmentDescription}</Text>
            <Text>Score Overview: {params.commitmentScoreOverview}</Text>
        </TouchableOpacity>
    );

export default CommitmentOverview;
