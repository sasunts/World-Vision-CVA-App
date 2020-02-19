import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ListItem
} from "react-native";
import styles from "../../assets/styleSheet";
import { createAction, getActions } from "../../api/actionPlanApi";
import { FlatList } from "react-native-gesture-handler";
import ActionPlanOverview from "./ActionPlanOverview";

export default class ActionPlanHome extends Component {
  state = {
    actionPlansList: [],
    currentActionPlanList: null
  };

  onActionsFetched = actionPlansList => {
    // console.log(actionPlansList);
    this.setState(prevState => ({
      actionPlansList: (prevState.actionPlansList = actionPlansList)
    }));
  };

  componentDidMount() {
    getActions(this.onActionsFetched);
  }

  renderRow({ item }) {
    return <ActionPlanOverview params={item} />;
  }

  render() {
    return (
      <ScrollView style={styles.commitmentHomeViewContainer}>
        <Text style={styles.heading}>Action Plan Screen</Text>
        <FlatList
          data={this.state.actionPlansList}
          renderItem={this.renderRow}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
