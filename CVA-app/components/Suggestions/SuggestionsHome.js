import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import Suggestions from "./Suggestions"
import styles from "../../assets/styleSheet";

function SuggestionsHome({ route, navigation }) {
  const { passParams } = route.params;
  return (
    <View>
      <Suggestions commitment={passParams}/>
    </View>
  );
}

export default SuggestionsHome;