import React, { Component, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "../../assets/styleSheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createAction } from "../../api/actionPlanApi";
import * as RootNavigation from "../../routes/RootNavigation";

export default class CreateActionPlan extends Component {
  constructor(props) {
    super(props);

    let actionPlan = this.props.actionPlan;

    this.state = {
      title: actionPlan?.title ?? null,
      description: actionPlan?.description ?? null,
      carriedOutBy: actionPlan?.carriedOutBy ?? null,
      monitoredBy: actionPlan?.monitoredBy ?? null,
      comments: actionPlan?.comments ?? null,
      deadline: actionPlan?.deadline ?? new Date()
    };

    this.onChange = this.onChange.bind(this);
  }

  handleSubmit() {
    const {
      title,
      description,
      carriedOutBy,
      monitoredBy,
      comments,
      deadline
    } = this.state;

    const actionPlan = {
      title,
      description,
      carriedOutBy,
      monitoredBy,
      comments,
      deadline
    };
    createAction(actionPlan, () => {
      console.log("Action Plan uploaded");
    });
    RootNavigation.navigate("Action-Plan");
  }

  onChange(event, date) {
    print = new Date(date);
    this.setState({
      deadline: new Date(date)
    });
  }

  render() {
    return (
      <View>
        {/*------ Title and Description Section ------*/}
        <View style={styles.commitmentOverviewContainer}>
          <Text style={styles.heading}> Create Action Plan </Text>
          <TextInput
            placeholder="Action Plan Title"
            style={styles.inputCommitmentTitle}
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput
            placeholder="Action Plan Description"
            style={styles.inputCommitmentDescription}
            multiline={true}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
          <TextInput
            placeholder="Carried Out By"
            style={styles.inputCommitmentTitle}
            multiline={true}
            value={this.state.carriedOutBy}
            onChangeText={carriedOutBy => this.setState({ carriedOutBy })}
          />
          <TextInput
            placeholder="Monitored By"
            style={styles.inputCommitmentTitle}
            multiline={true}
            value={this.state.monitoredBy}
            onChangeText={monitoredBy => this.setState({ monitoredBy })}
          />
          <TextInput
            placeholder="Comments"
            style={styles.inputCommitmentDescription}
            multiline={true}
            value={this.state.comments}
            onChangeText={comments => this.setState({ comments })}
          />
          <Text>Action Plan deadline</Text>
          <DateTimePicker
            mode="date"
            value={this.state.deadline}
            minimumDate={new Date()}
            onChange={this.onChange}
          />
        </View>

        {/*------ Submiting the new Commitment 
        FIX RETURN TO HOME------*/}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.handleSubmit();
          }}
        >
          <Text style={styles.addButtonText}>Create Action Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.GoBack();
          }}
        >
          <Text style={styles.addButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //TODO: FIX THIS!!!
  GoBack() {
    RootNavigation.navigate("Action-Plan");
  }
}
