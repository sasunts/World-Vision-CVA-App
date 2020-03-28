import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/actionPlanApi";
import * as RootNavigation from "../../routes/RootNavigation";
import DateTimePicker from "@react-native-community/datetimepicker";

export default class ActionPlanHome extends Component {
  constructor(props) {
    super(props);
    let datePickerRender = false;
    this.onChange = this.onChange.bind(this);
    this.state = {
      title: this.props.route.params.passList.title,
      description: this.props.route.params.passList.description,
      carriedOutBy: this.props.route.params.passList.carriedOutBy,
      monitoredBy: this.props.route.params.passList.monitoredBy,
      comments: this.props.route.params.passList.comments,
      deadline: this.props.route.params.passList.deadline.toDate(),
      id: this.props.route.params.passList.id
    };
    console.log(this.props.route.params.passList);
  }

  handleSubmit() {
    const {
      title,
      description,
      carriedOutBy,
      monitoredBy,
      comments,
      deadline,
      id
    } = this.state;

    const actionPlan = {
      title,
      description,
      carriedOutBy,
      monitoredBy,
      comments,
      deadline,
      id
    };

    api.updateAction(actionPlan);

    this.props.navigation.navigate("Action-Plan");
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

  datePrettifier(str) {
    var date = str.split(" ");
    var day = date[0];
    var month = date[1];
    var dateNum = date[2];
    var year = date[3];
    var retStr = day + " " + month + " " + dateNum + " " + year;
    return retStr;
  }

  render() {
    //function ActionPlan({ route, navigation }) {

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.commitmentOverviewContainer}>
            <Text style={styles.heading}> Edit Action Plan </Text>
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
            <Text style={styles.buttonText}>Update Action Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate("Action-Plan");
            }}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
