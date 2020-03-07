import React, { Component } from "react";
import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import {
    Table,
    Row,
    Rows,
    Col,
    Cols,
    TableWrapper
} from "react-native-table-component";
import styles from "../../assets/styleSheet";
import * as api from "../../api/govtCommitmentsApi";
import UpdateCommitment from "./UpdateCommitment";
import * as RootNavigation from "../../routes/RootNavigation";
import {
    gradeCommitment,
    getGradesByCommitmentId
} from "../../api/commitmentGradeApi";
import GovtCommitmentsHome from "./GovtCommitmentsHome";

export default class Commitment extends Component {
    constructor(props) {
        super(props);

        let commitment = this.props.commitment;

        if (commitment) {
            let fetchedStandards = [];
            // Need to format data properly for tables
            for (let i = 0; i < commitment.inputTypes.length; i++)
                fetchedStandards.push([
                    commitment.inputTypes[i],
                    commitment.govtStandards[i]
                ]);

            // Probably don't need to set it up as state like this
            // just force of habit
            this.state = {
                commitmentGradesRecieved: [], /////////////////////////////
                modeGrade: [],
                gradeTableHead: ["Commitment Grade"],
                gradeTableData: [],
                id: commitment?.id,
                commitmentId: commitment.id,
                commitment: commitment?.title ?? null,
                tableHead: ["Input Type", "Government Standards"],
                title: commitment?.title,
                description: commitment?.description,
                standards: fetchedStandards,
                renderEditor: false,
                commitmentGrade: "",
                modalOpen: false
            };
        }
    }
    onCommitmentsGradesFetched = commitmentGradesRecieved => {
        this.setState(prevState => ({
            commitmentGradesRecieved: (prevState.commitmentGradesRecieved = commitmentGradesRecieved)
        }));
        let justGradesGiven = [];

        for (let i = 0; i < commitmentGradesRecieved.length; i++) {
            justGradesGiven.push(commitmentGradesRecieved[i].commitmentGrade);
        }
        console.log(justGradesGiven);

        let modeGrade = [
            justGradesGiven
                .sort(
                    (a, b) =>
                        justGradesGiven.filter(v => v === a).length -
                        justGradesGiven.filter(v => v === b).length
                )
                .pop()
        ];
        this.setState(prevState => ({
            modeGrade: [(prevState.modeGrade = modeGrade)]
        }));

        console.log(modeGrade);
    };

    componentDidMount() {
        getGradesByCommitmentId(
            this.props.commitment.id,
            this.onCommitmentsGradesFetched
        );
    }

    handleDeleteCommitment(id) {
        api.deleteGovtCommitment(id)
            .then(() => {
                console.log("Commitment deletion successful");
                RootNavigation.navigate("Govt-Commitments-Home");
            })
            .catch(e => console.log("Error: deletion unsuccessful: " + e));
    }
    handleSubmit = commitmentGrade => {
        console.log(commitmentGrade);
        this.setState(
            { commitmentGrade: this.state.commitmentGrade },

            () => console.log(this.state)
        );

        this.setState({ modalOpen: false });

        const { commitment, commitmentId } = this.state;

        const grade = {
            commitment,
            commitmentId,
            commitmentGrade
        };
        gradeCommitment(grade, () => {
            console.log("commitment graded");
        });
    };

    render() {
        const commitment = this.props.commitment;
        const modalOpen = this.state.modalOpen; //////////////////////////
        return (
            <ScrollView>
                <View style={styles.standardsTableOuterContainer}>
                    <Modal visible={modalOpen} animationType="slide">
                        <TouchableOpacity
                            style={styles.veryGoodButtonContainer}
                            onPress={() => {
                                this.handleSubmit("Very Good!");
                            }}
                        >
                            <Text style={styles.gradeButtonText}>
                                Very Good!
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.goodButtonContainer}
                            onPress={() => {
                                this.handleSubmit("Good!");
                            }}
                        >
                            <Text style={styles.gradeButtonText}>Good!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.averageButtonContainer}
                            onPress={() => {
                                this.handleSubmit("Average.");
                            }}
                        >
                            <Text style={styles.gradeButtonText}>Average.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.badButtonContainer}
                            onPress={() => {
                                this.handleSubmit("Bad.");
                            }}
                        >
                            <Text style={styles.gradeButtonText}>Bad.</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.veryBadButtonContainer}
                            onPress={() => {
                                this.handleSubmit("Very Bad.");
                            }}
                        >
                            <Text style={styles.gradeButtonText}>
                                Very Bad.
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                console.log("Cancel");
                                this.setState({ modalOpen: false });
                            }}
                        >
                            <Text style={styles.gradeButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </Modal>
                </View>

                {this.state.renderEditor ? (
                    <UpdateCommitment commitment={this.props.commitment} />
                ) : (
                    <View>
                        <View style={styles.standardsTableOuterContainer}>
                            <View style={styles.standardsTableInnerContainer}>
                                <Table
                                    borderStyle={{
                                        borderWidth: 2,
                                        borderColor: "#c8e1ff"
                                    }}
                                >
                                    <Row data={this.state.tableHead} />
                                    <Rows data={this.state.standards} />
                                </Table>
                                <Table
                                    borderStyle={{
                                        borderWidth: 2,
                                        borderColor: "#c8e1ff"
                                    }}
                                >
                                    <TableWrapper style={styles.wrapper}>
                                        <Col data={this.state.gradeTableHead} />
                                        <Col data={this.state.modeGrade} />
                                    </TableWrapper>
                                </Table>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                console.log("Rating This Commitment");
                                this.setState({ modalOpen: true });
                            }}
                        >
                            <Text>Rate This Commitment</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.setState({ renderEditor: true });
                            }}
                        >
                            <Text>Edit Commitment</Text>
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-evenly"
                            }}
                        >
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() =>
                                    RootNavigation.navigate("SuggestionsHome", {
                                        commitment
                                    })
                                }
                            >
                                <Text style={styles}>Suggestions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonContainer}
                                onPress={() =>
                                    RootNavigation.navigate("Report", {
                                        commitment
                                    })
                                }
                            >
                                <Text>Create Standards Report</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={() => {
                                this.handleDeleteCommitment(commitment.id);
                            }}
                        >
                            <Text>Delete Commitment</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        );
    }
}
