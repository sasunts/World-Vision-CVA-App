import React from "react";
import { View, ScrollView, TouchableOpacity, Text, TextInput } from "react-native";
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi";

function UpdateCommitment({ navigation, route }) {
    let state = [];
    // This screen gets all it's details through the route paramter
    if (route.params.details) {
        const details = route.params.details;

        let fetchedStandards = [];
        // Need to format data properly for tables
        for (let i = 0; i < details.inputTypes.length; i++)
            fetchedStandards.push([details.inputTypes[i], details.govtStandards[i]]);

        // Probably don't need to set it up as state like this
        // just force of habit
        state = {
            id: details?.id,
            tableHead: ["Input Type", "Government Standards"],
            title: details?.title,
            description: details?.description,
            standards: fetchedStandards,
            renderEditor: false
        };
    }

    // This code for handling the different input values
    // checks which input from the array is being written to
    // this allows the form to be dynamic e.g. users can add and
    // remove inputs
    handleInputNameChange = (idx, state) => (evt) => {
        const newInputs = state.inputs.map((input, sidx) => {
            if (idx !== sidx) return input;
            return { ...input, name: evt.nativeEvent.text };
        });
        this.setState({ inputs: newInputs });
    };

    // same as a above but for the standards value associated with
    // that input
    handleInputStandardChange = (idx, state) => (evt) => {
        const newInputs = state.inputs.map((input, sidx) => {
            if (idx !== sidx) return input;
            return { ...input, standard: evt.nativeEvent.text };
        });

        this.setState({ inputs: newInputs });
    };

    // Removes an input field for standards from the form
    handleRemoveInput = (idx, state) => () => {
        this.setState({
            inputs: state.inputs.filter((s, sidx) => idx !== sidx)
        });
    };

    return (
        <ScrollView>
            <View>
                {/*------ Title and Description Section ------*/}
                <View style={styles.commitmentOverviewContainer}>
                    <Text style={styles.heading}> Create Commitment </Text>
                    <TextInput placeholder="Commitment Title"
                        style={styles.inputCommitmentTitle}
                        value={state.title}
                        onChangeText={title => this.setState({ title })}
                    />
                    <TextInput placeholder="Commitment Description"
                        style={styles.inputCommitmentDescription} multiline={true}
                        value={state.description}
                        onChangeText={description => this.setState({ description })}
                    />

                    {/*------ Dynamic Inputs and Standards ------*/}
                    <Text style={styles.heading}>Inputs</Text>
                    {state.inputs.map((input, idx) => (
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
                            onPress={() => { this.setState({ inputs: state.inputs.concat([{ name: "", standard: "" }]) }) }}>
                            <Text style={styles.addButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*------ Submiting the new Commitment ------*/}
                <TouchableOpacity style={styles.buttonContainer}
                    onPress={() => { this.handleSubmit() }}>
                    <Text style={styles.addButtonText}>Create Commitment</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    );
}


const handleUpdateCommitment = (state) => {
    console.log(state)
    state.renderEditor = true;
    console.log(state.renderEditor)
}

export default UpdateCommitment;
