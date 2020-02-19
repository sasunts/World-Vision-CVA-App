import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";

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
          <Text style={styles.buttonText}>TEST</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ActionPlan;