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
import { getActions } from "../../api/actionPlanApi";
import { FlatList } from "react-native-gesture-handler";
import ActionPlanOverview from "./ActionPlanOverview";
import CreateActionPlan from "./CreateActionPlan";
import { NavigationEvents } from "react-navigation";

export default class ActionPlanHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionPlansList: [],
      currentActionPlanList: null,
      renderCreateActionPlan: false,
      lastRefresh: Date(Date.now()).toString()
    };
  }

  // Fetch Actions from Firebase
  onActionsFetched = actionPlansList => {
    this.setState(prevState => ({
      actionPlansList: (prevState.actionPlansList = actionPlansList)
    }));
  };

  // On screen mount fetch Actions
  componentDidMount() {
    getActions(this.onActionsFetched);
  }

  //Function to render each action Plan
  renderRow({ item }) {
    return <ActionPlanOverview params={item} />;
  }

  // Render UI
  render() {
    let { actionPlansList, renderCreateActionPlan } = this.state;
    return (
      <ScrollView style={styles.commitmentHomeViewContainer}>
        <View style={styles.container}>
          {renderCreateActionPlan ? (
            <CreateActionPlan
              display={this.state.renderCreateActionPlan}
              closeDisplay={() =>
                this.setState({ renderCreateActionPlan: false })
              }
              refreshScreen={() => getActions(this.onActionsFetched)}
            />
          ) : (
            <View>
              <Text style={styles.heading}>Action Plans</Text>
              <FlatList
                data={actionPlansList}
                renderItem={this.renderRow}
                keyExtractor={item => item.id}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  this.setState({ renderCreateActionPlan: true });
                }}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
}
