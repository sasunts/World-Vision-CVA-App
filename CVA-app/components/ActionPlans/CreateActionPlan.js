import React, { Component, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import styles from "../../assets/styleSheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { createAction } from "../../api/actionPlanApi";
import * as RootNavigation from "../../routes/RootNavigation";

export default class CreateActionPlan extends Component {
  constructor(props) {
    super(props);

    let actionPlan = this.props.actionPlan;
    let datePickerRender = false;
    this.state = {
      title: actionPlan?.title ?? null,
      description: actionPlan?.description ?? null,
      carriedOutBy: actionPlan?.carriedOutBy ?? null,
      monitoredBy: actionPlan?.monitoredBy ?? null,
      comments: actionPlan?.comments ?? null,
      deadline: actionPlan?.deadline ?? new Date(),
      modalOpen: true
    };

    this.onChange = this.onChange.bind(this);
  }

  datePrettifier(str) {
    var date = str.split(" ");
    var day = date[0];
    var month = date[1];
    var dateNum = date[2];
    var year = date[3];
    var retStr = day + " " + month + " " + dateNum + " " + year;
    return retStr;
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
    this.props.refreshScreen();
    this.props.closeDisplay();
  }

  onChange(event, date) {
    if (date !== undefined) {
      this.setState({
        deadline: new Date(date)
      });
    }
    this.setState({ datePickerRender: false });
  }

  showDatepicker() {
    this.datePickerRender = true;
    return;
  }

  render() {
    return (
      <View>
        <Modal
          visible={this.state.renderCreateActionPlan}
          animationType="slide"
        >
          <ScrollView style={styles.modalContainer}>
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
              <Text style={styles.contentHeading}>Action Plan deadline:</Text>
              <Text style={styles.contentHeading}>
                {this.datePrettifier(this.state.deadline.toString())}
              </Text>

              {this.state.datePickerRender ? (
                <DateTimePicker
                  mode="date"
                  value={this.state.deadline}
                  minimumDate={new Date()}
                  onChange={this.onChange}
                />
              ) : (
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => {
                    this.setState({ datePickerRender: true });
                  }}
                >
                  <Text style={styles.buttonText}>Select Deadline Date</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.handleSubmit();
              }}
            >
              <Text style={styles.buttonText}>Create Action Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.props.closeDisplay();
              }}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <View style={{ height: 80 }}></View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
