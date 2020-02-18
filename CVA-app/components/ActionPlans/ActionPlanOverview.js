import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../assets/styleSheet";
import { useNavigation } from "@react-navigation/native";

const ActionPlanOverview = ({ params }) => {
  const navigation = useNavigation();
  const passParams = params;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("ActionPlan", { list: passParams });
      }}
    >
      <Text>Title: {params.title}</Text>
      <Text>Description: {params.description}</Text>
      <Text>Carried out by: {params.carriedOutBy}</Text>
      <Text>Monitored by: {params.monitoredBy}</Text>
      <Text>Deadline: {params.deadline.toDate().toString()} </Text>
    </TouchableOpacity>
  );
};

export default ActionPlanOverview;
