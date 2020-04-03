import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

// Basic loading screen
const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loading;
