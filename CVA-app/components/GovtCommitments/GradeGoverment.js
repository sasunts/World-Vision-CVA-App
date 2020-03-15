import React, { Component, useState } from "react";
import { View, TouchableOpacity, Text, Modal } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";

function Commitment({ navigation, route }) {
  state = [];
  const [modalOpen, setModalOpen] = useState(false);
  // This screen gets all it's details through the route paramter
  // TODO: remove test data
  if (route.params.details) {
    const details = route.params.details;
    state = {
      tableHead: ["Input Type", "Government Standards"],
      title: details?.commitmentTitle,
      description: details?.commitmentDescription,
      standards: details?.standards,
      testStandards: [
        ["teachers:students", "1:45"],
        ["chairs:students", "1:1"]
      ],
      commitmentGradeFromUser: ""
    };
  }

  return (
    <View>
      <View style={styles.standardsTableOuterContainer}>
        <Modal visible={modalOpen} animationType="slide">
          <TouchableOpacity
            style={styles.veryGoodButtonContainer}
            onPress={() => {
              console.log("Very Good!");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Very Good!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goodButtonContainer}
            onPress={() => {
              console.log("Good!");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Good!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.averageButtonContainer}
            onPress={() => {
              console.log("Average.");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Average.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.badButtonContainer}
            onPress={() => {
              console.log("Bad.");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Bad.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.veryBadButtonContainer}
            onPress={() => {
              console.log("Very Bad.");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Very Bad.</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              console.log("Cancel");
              setModalOpen(false);
            }}
          >
            <Text style={styles.gradeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </Modal>
      </View>
      <View style={styles.standardsTableOuterContainer}>
        <View style={styles.standardsTableInnerContainer}>
          <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
            <Row data={state.tableHead} />
            <Rows data={state.testStandards} />
          </Table>
        </View>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>View Actual Standards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text>Create Standards Report</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            console.log("Rating This Commitment");
            setModalOpen(true);
          }}
        >
          <Text>Rate This Commitment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Commitment;
