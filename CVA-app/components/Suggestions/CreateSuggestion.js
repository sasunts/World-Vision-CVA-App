import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../../assets/styleSheet";
import { createSuggestion } from "../../api/suggestionsApi";
import Suggestions from "./Suggestions";

export default class CreateSuggestion extends Component {
  constructor(props) {
    super(props);

    let commitment = this.props.commitment;

    this.state = {
      commitment: commitment?.title ?? null,
      description: "",
      commitmentId: commitment.id,
      isFinished: false
    };
  }

  handleSubmit() {
    const { commitment, description, commitmentId, isFinished } = this.state;
    const suggestion = {
      commitment,
      description,
      commitmentId
    };
    createSuggestion(suggestion, () => {
      console.log("suggestion uploaded");
    });
  }

  render() {
    return (
      <View style={styles.commitmentOverviewContainer}>
        {this.state.isFinished ? (
          <Suggestions commitment={this.props.commitment} />
        ) : (
          <View>
            <Text style={styles.heading}> Create Suggestion </Text>
            <TextInput
              placeholder="Suggestion Description"
              style={styles.inputCommitmentDescription}
              multiline={true}
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
            />
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                this.handleSubmit();
                this.setState({ isFinished: true });
              }}
            >
              <Text style={styles.buttonText}>Create Suggesstion</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
