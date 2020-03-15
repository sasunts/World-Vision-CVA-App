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
import CreateActionPlan from "./CreateActionPlan";

export default class ActionPlanHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionPlansList: [],
      currentActionPlanList: null,
      renderCreateActionPlan: false
    };
  }

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
    let { actionPlansList, renderCreateActionPlan } = this.state;
    return (
      <ScrollView style={styles.commitmentHomeViewContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Action Plans</Text>
          {renderCreateActionPlan ? (
            <CreateActionPlan />
          ) : (
            <View>
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
