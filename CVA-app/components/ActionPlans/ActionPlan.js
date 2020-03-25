import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/actionPlanApi";
import * as RootNavigation from "../../routes/RootNavigation";

function handleDeleteActionPlan(id) {
  api.deleteAction(id, () => {
    console.log("Action Plan deletion successful");
    RootNavigation.navigate("Action-Plan");
  });
}

function datePrettifier(str) {
  var date = str.split(" ");
  var day = date[0];
  var month = date[1];
  var dateNum = date[2];
  var year = date[3];
  var retStr = day + " " + month + " " + dateNum + " " + year;
  return retStr;
}

function ActionPlan({ route, navigation }) {
  const { list } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.commitmentOverviewContainer}>
        <Text style={styles.contentHeading}>Title: {list.title}</Text>
        <Text>Description: {list.description}</Text>
        <Text>Carried out by: {list.carriedOutBy}</Text>
        <Text>Monitored by: {list.monitoredBy}</Text>
        <Text>
          Deadline: {datePrettifier(list.deadline.toDate().toString())}{" "}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              RootNavigation.navigate("EditActionPlan", {
                passList: list
              });
            }}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              console.log(list.id), handleDeleteActionPlan(list.id);
            }}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ActionPlan;
