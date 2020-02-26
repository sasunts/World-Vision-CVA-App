import React, { Component } from "react";
import { Text, Dimensions, ScrollView, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import {
	Table,
	TableWrapper,
	Row,
	Rows,
	Col,
	Cols,
	Cell
} from "react-native-table-component";
import styles from "../../assets/styleSheet";

const Report = ({ route, params }) => {
	const details = route.params;

	const data = {
		labels: ["Very good", "Good", "Ok", "Bad", "Very bad"],
		datasets: [
			{
				data: [5, 10, 8, 3, 6]
			}
		]
	};

	return (
		<ScrollView>
			<Text
				style={{
					textAlign: "center",
					fontSize: 20,
					fontWeight: "bold",
					marginTop: 10,
					padding: 10
				}}
			>
				{details.passParams.title}
			</Text>
			<BarChart
				data={data}
				width={Dimensions.get("window").width - 20}
				height={250}
				chartConfig={{
					backgroundGradientFrom: "#E3E2F0",
					backgroundGradientTo: "#fff",
					backgroundGradientToOpacity: 0,
					barPercentage: 0.7,
					color: (opacity = 1) => `rgba(20, 58, 252, ${opacity})`,
					style: {
						borderRadius: 16,
						marginVertical: 10
					}
				}}
				fromZero={true}
				style={{
					marginVertical: 10,
					marginLeft: 10,
					borderRadius: 10
				}}
			/>
			<View style={styles.tableContainer}>
				<Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
					<Row
						data={data.labels}
						style={styles.tableHead}
						textStyle={styles.tableText}
					/>
					<Rows data={[data.datasets[0].data]} textStyle={styles.tableText} />
				</Table>
			</View>
		</ScrollView>
	);
};

export default Report;
