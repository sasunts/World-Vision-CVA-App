import * as React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../components/Home";
import ActionPlanHome from "../components/ActionPlans/ActionPlanHome";
import GovtCommitmentsHome from "../components/GovtCommitments/GovtCommitmentsHome";
import Commitment from "../components/GovtCommitments/Commitment";
import CreateCommitment from "../components/GovtCommitments/CreateCommitment";
import ActionPlan from "../components/ActionPlans/ActionPlan";
import Report from "../components/Reports/Report";

const Stack = createStackNavigator();

function MyStack() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen
					name="Action-Plan"
					component={ActionPlanHome}
					options={{ title: "Action Plans" }}
				/>
				<Stack.Screen
					name="ActionPlan"
					component={ActionPlan}
					options={({ route }) => ({
						title: route.params.param?.title
					})}
				/>
				<Stack.Screen
					name="Govt-Commitments-Home"
					component={GovtCommitmentsHome}
					options={{ title: "Government Commitments" }}
				/>
				<Stack.Screen
					name="Commitment"
					component={Commitment}
					options={({ route }) => ({
						title: route.params.details?.commitmentTitle
					})}
				/>
				<Stack.Screen name="CreateCommitment" component={CreateCommitment} />
				<Stack.Screen name="Report" component={Report} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MyStack;
