import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../assets/styleSheet';

export default class CreateCommitment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: [{ name: "" }],
      enableEdit: false
    };
  }

  componentDidMount() {
    console.log("mounted comp")
    this.setState({ enableEdit: true })
    console.log(this.state.enableEdit)
  };

  handleInputNameChange = idx => evt => {
    const newInputs = this.state.inputs.map((input, sidx) => {
      if (idx !== sidx) return input;
      return { ...input, name: evt.target.value };
    });

    this.setState({ inputs: newInputs });
  };

  handleAddInput = () => {
    let newInput = this.state.inputs.concat([{ name: "" }])
    this.setState({
      inputs: newInput
    });
  };

  handleRemoveInput = idx => () => {
    this.setState({
      inputs: this.state.inputs.filter((s, sidx) => idx !== sidx)
    });
    console.log(this.state.enableEdit)
  };

  handleSubmit() {
    //TODO
    console.log(this.state.enableEdit);
  };

  render() {
    return (
      <View>
        <View style={styles.commitmentOverviewContainer}>
          <Text style={styles.heading}> Create Commitment </Text>
          <TextInput placeholder="Commitment Title"
            style={styles.inputCommitmentTitle} />
          <TextInput placeholder="Commitment Description"
            style={styles.inputCommitmentDescription} multiline={true} />

          <Text>Inputs</Text>
          {this.state.inputs.map((input, idx) => (
            <View>
              <TextInput
                placeholder={`Input #${idx + 1} name`}
                value={input.name}
                onChange={this.handleInputNameChange(idx)}
              />
              <TouchableOpacity
                onPress={this.handleRemoveInput(idx)}>
                <Text>-</Text>
              </TouchableOpacity>
              {this.state.enableEdit ?
                <TouchableOpacity style={styles.addButton}
                  onPress={() => { this.setState({inputs: this.state.inputs.concat([{name: ""}])}) }}>
                  <Text>+</Text>
                </TouchableOpacity> : null}
            </View>
        ))}

        </View>


      <TouchableOpacity style={styles.buttonContainer}
        onPress={() => { this.handleSubmit() }}>
        <Text style={styles.addButtonText}>Create Commitment</Text>
      </TouchableOpacity>

      </View >

    );
  }
}
