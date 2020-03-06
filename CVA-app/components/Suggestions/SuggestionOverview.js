import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from '../../assets/styleSheet'
import { useNavigation } from '@react-navigation/native';

const SuggestionOverview = ({
    params,
}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.commitmentOverviewContainer}>
            <Text>{params.commitment}</Text>
            <Text>{params.description}</Text>
            <Text>{params.upvotes}</Text>
        </TouchableOpacity>
    );}

export default SuggestionOverview;
