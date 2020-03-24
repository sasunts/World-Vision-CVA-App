import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Table, Row, Rows } from "react-native-table-component";
import Chat from "./Chat"
import styles from "../../assets/styleSheet";

function Chats({ route, navigation }) {
  const passParams  = route.params.chat;

  return (
    <Chat chat = {passParams}/>
  );
}

export default Chats;