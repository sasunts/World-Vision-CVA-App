import React, { Component } from "react";
import { Text, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";

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
					marginTop: 20
				}}
			>
				{details.passParams.title}
			</Text>
			<BarChart
				data={data}
				width={Dimensions.get("window").width - 16}
				height={250}
				chartConfig={{
					backgroundColor: "#1cc910",
					backgroundGradientFrom: "#eff3ff",
					backgroundGradientTo: "#efefef",
					color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
					style: {
						borderRadius: 16
					}
				}}
				fromZero={true}
				style={{
					marginVertical: 8,
					borderRadius: 10
				}}
			/>
		</ScrollView>
	);
};

export default Report;
