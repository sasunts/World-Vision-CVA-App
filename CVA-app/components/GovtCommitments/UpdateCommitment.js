import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../assets/styleSheet';
import { updateGovtCommitment } from "../../api/govtCommitmentsApi";

export default class UpdateCommitment extends Component {
  constructor(props) {
    super(props);

    let temp = [];
    let commitment = this.props.commitment;

    if (commitment != null) {

      if (commitment.inputTypes && commitment.govtStandards) {
        for (let i = 0; i < commitment.inputTypes.length; i++) {
          const commitmentName = commitment.inputTypes[i];
          const standard = commitment.govtStandards[i];

          temp.push({ name: commitmentName, standard: standard })

        }
      }
    }
    this.state = {
      title: commitment?.title ?? null,
      description: commitment?.description ?? null,
      inputs: temp ?? [{ name: "", standard: "" }],
      id: commitment?.id ?? null
    };
  }

  // This code for handling the different input values
  // checks which input from the array is being written to
  // this allows the form to be dynamic e.g. users can add and
  // remove inputs
  handleInputNameChange = (idx) => (evt) => {
    const newInputs = this.state.inputs.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, name: evt.nativeEvent.text };
    });
    this.setState({ inputs: newInputs });
  };

  // same as a above but for the standards value associated with
  // that input
  handleInputStandardChange = (idx) => (evt) => {
    const newInputs = this.state.inputs.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, standard: evt.nativeEvent.text };
    });

    this.setState({ inputs: newInputs });
  };

  // Removes an input field for standards from the form
  handleRemoveInput = idx => () => {
    this.setState({
      inputs: this.state.inputs.filter((s, sidx) => idx !== sidx)
    });
  };

  handleSubmit() {
    
    const { title, description, inputs, id } = this.state;
    console.log(this.state)
    let inputTypes = [];
    let govtStandards = [];
    // Formating the standards and input types for storage
    inputs.forEach(input => {
      inputTypes.push(input.name);
      govtStandards.push(input.standard)
    });
    const govtCommitments = {
      title, description,
      inputTypes, govtStandards, id
    }
    console.log(govtCommitments);
    updateGovtCommitment(govtCommitments, () => { console.log("commitment updated!") })
  };

  render() {
    return (
      <ScrollView>
        {/*------ Title and Description Section ------*/}
        <View style={styles.commitmentOverviewContainer}>
          <Text style={styles.heading}> Edit Commitment </Text>
          <TextInput placeholder="Commitment Title"
            style={styles.inputCommitmentTitle}
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
          <TextInput placeholder="Commitment Description"
            style={styles.inputCommitmentDescription} multiline={true}
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />

          {/*------ Dynamic Inputs and Standards ------*/}
          <Text style={styles.heading}>Inputs</Text>
          {this.state.inputs.map((input, idx) => (
            <View style={styles.inputsContainer}>
              <TextInput
                style={styles.inputCommitmentInputs}
                placeholder={`Input #${idx + 1} name`}
                value={input.name}
                onChange={this.handleInputNameChange(idx)}
              />
              <TextInput
                style={styles.inputCommitmentInputs}
                placeholder={`Input #${idx + 1} standard`}
                value={input.standard}
                onChange={this.handleInputStandardChange(idx)}
              />
              <TouchableOpacity style={styles.removeInputButton}
                onPress={this.handleRemoveInput(idx)}>
                <Text style={styles.addButtonText}>-</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View>
            {/*----- This button adds a new field to the inputs array-----*/}
            <TouchableOpacity style={styles.addInputButton}
              onPress={() => { this.setState({ inputs: this.state.inputs.concat([{ name: "", standard: "" }]) }) }}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*------ Submiting the new Commitment ------*/}
        <TouchableOpacity style={styles.buttonContainer}
          onPress={() => { this.handleSubmit() }}>
          <Text style={styles.addButtonText}>Update Commitment</Text>
        </TouchableOpacity>
      </ScrollView >
    );
  }
}
