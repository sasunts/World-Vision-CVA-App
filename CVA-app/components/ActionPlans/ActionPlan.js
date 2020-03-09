import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/actionPlanApi";
import * as RootNavigation from "../../routes/RootNavigation"


function handleDeleteActionPlan(id) {
  api.deleteAction(id, () => {
    console.log("Action Plan deletion successful");
    //TODO: FIX RETURNING AFTER DELETE
    RootNavigation.navigate("Action-Plan");
  });
}

function ActionPlan({ route, navigation }) {
  const { list } = route.params;
  return (
    <View>
      <Text>Title: {list.title}</Text>
      <Text>Description: {list.description}</Text>
      <Text>Carried out by: {list.carriedOutBy}</Text>
      <Text>Monitored by: {list.monitoredBy}</Text>
      <Text>Deadline: {list.deadline.toDate().toString()} </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log(list.id), handleDeleteActionPlan(list.id);
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ActionPlan;
