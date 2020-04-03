import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "../../assets/styleSheet";
import { useNavigation } from "@react-navigation/native";

//Render UI
const ActionPlanOverview = ({ params }) => {
  const navigation = useNavigation();
  const passParams = params;
  return (
    <TouchableOpacity
      style={styles.commitmentOverviewContainer}
      onPress={() => {
        navigation.navigate("ActionPlan", { list: passParams });
      }}
    >
      <Text style={styles.contentHeading}>Title: {params.title}</Text>
      <Text>Description: {params.description}</Text>
      <Text>Carried out by: {params.carriedOutBy}</Text>
      <Text>Monitored by: {params.monitoredBy}</Text>
      <Text>
        Deadline: {datePrettifier(params.deadline.toDate().toString())}{" "}
      </Text>
    </TouchableOpacity>
  );
};

// Function which changes time stamp to human readable format
function datePrettifier(str) {
  var date = str.split(" ");
  var day = date[0];
  var month = date[1];
  var dateNum = date[2];
  var year = date[3];
  var retStr = day + " " + month + " " + dateNum + " " + year;
  return retStr;
}

export default ActionPlanOverview;
