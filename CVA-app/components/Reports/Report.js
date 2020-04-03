import React, { Component } from "react";
import { Text, ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { getGradesByCommitmentId } from "../../api/commitmentGradeApi";
import { Table, Row, Rows } from "react-native-table-component";
import styles from "../../assets/styleSheet";

export default class Commitment extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.route.params.commitment.title,
			commitmentGradesRecieved: [],
			modeGrade: [],
			veryGood: 0,
			good: 0,
			ok: 0,
			bad: 0,
			veryBad: 0,
		};
		console.log(this.state.commitmentGradesRecieved);
	}

	// receives grades for commitment calling from commitmentGradeApi
	async componentDidMount() {
		await getGradesByCommitmentId(
			this.props.route.params.commitment.id,
			this.onCommitmentsGradesFetched
		);
		this.setData();
	}

	onCommitmentsGradesFetched = (commitmentGradesRecieved) => {
		this.setState((prevState) => ({
			commitmentGradesRecieved: (prevState.commitmentGradesRecieved = commitmentGradesRecieved),
		}));
	};

	// takes each grade and counts each one accordingly, data used in table and bar chart
	setData() {
		let grades = this.state.commitmentGradesRecieved;

		for (let i = 0; i < grades.length; i++) {
			console.log(grades[i].commitmentGrade);
			if (grades[i].commitmentGrade === 1) {
				this.setState({ veryBad: this.state.veryBad + 1 });
			}
			if (grades[i].commitmentGrade === 2) {
				this.setState({ bad: this.state.bad + 1 });
			}
			if (grades[i].commitmentGrade === 3) {
				this.setState({ ok: this.state.ok + 1 });
			}
			if (grades[i].commitmentGrade === 4) {
				this.setState({ good: this.state.good + 1 });
			}
			if (grades[i].commitmentGrade === 5) {
				this.setState({ veryGood: this.state.veryGood + 1 });
			}
		}
	}

	// renders Report UI
	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.commitmentOverviewContainer}>
						<Text
							style={{
								textAlign: "center",
								fontSize: 20,
								fontWeight: "bold",
								padding: 10,
							}}
						>
							{this.state.title}
						</Text>
						<BarChart
							data={{
								labels: ["Very good", "Good", "Ok", "Bad", "Very bad"],
								datasets: [
									{
										data: [
											this.state.veryGood,
											this.state.good,
											this.state.ok,
											this.state.bad,
											this.state.veryBad,
										],
									},
								],
							}}
							width={300}
							height={300}
							chartConfig={{
								backgroundGradientFrom: "rgba(0, 0, 0, 0",
								backgroundGradientToOpacity: 0,
								barPercentage: 0.7,
								color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
								style: {
									borderRadius: 16,
									marginVertical: 10,
								},
							}}
							fromZero={true}
							style={{
								marginVertical: 10,
								borderRadius: 10,
							}}
						/>
					</View>
					<View style={styles.commitmentOverviewContainer}>
						<View style={styles.tableContainer}>
							<Table
								borderStyle={{
									borderWidth: 2,
									borderColor: "rgba(0, 0, 0, 0.7)",
								}}
							>
								<Row
									data={["Very good", "Good", "Ok", "Bad", "Very bad"]}
									style={styles.tableHead}
									textStyle={styles.tableText}
								/>
								<Rows
									data={[
										[
											this.state.veryGood,
											this.state.good,
											this.state.ok,
											this.state.bad,
											this.state.veryBad,
										],
									]}
									textStyle={styles.tableText}
								/>
							</Table>
						</View>
					</View>
				</View>
			</ScrollView>
		);
	}
}
