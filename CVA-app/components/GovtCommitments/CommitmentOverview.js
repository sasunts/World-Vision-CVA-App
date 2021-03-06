import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../assets/styleSheet";
import { useNavigation } from "@react-navigation/native";

const CommitmentOverview = ({ params }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.commitmentOverviewContainer}
      onPress={() => {
        navigation.navigate("CommitmentPage", { details: params });
      }}
    >
      <Text style={styles.contentHeading}>{params.title}</Text>
      <Text>{params.description}</Text>
      <Text>Score Overview: {params.scoreOverview}</Text>
    </TouchableOpacity>
  );
};

export default CommitmentOverview;
