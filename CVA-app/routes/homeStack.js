import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import "react-native-gesture-handler";
import ActionPlan from "../components/ActionPlans/ActionPlan";
import ActionPlanHome from "../components/ActionPlans/ActionPlanHome";
import CreateCommitment from "../components/GovtCommitments/CreateCommitment";
import GovtCommitmentsHome from "../components/GovtCommitments/GovtCommitmentsHome";
import UpdateCommitment from "../components/GovtCommitments/UpdateCommitment";
import Home from "../components/Home";
import Report from "../components/Reports/Report";
import Suggestions from "../components/Suggestions/Suggestions";
import CommitmentPage from "../components/GovtCommitments/CommitmentPage";
import Commitment from "../components/GovtCommitments/Commitment";

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
					name="CommitmentPage"
					component={CommitmentPage}
					options={({ route }) => ({
						title: route.params.details?.title
					})}
				/>
				<Stack.Screen
					name="Suggestions"
					component={Suggestions}
					options={{ title: "Suggestions" }}
				/>
				{/* <Stack.Screen name="Commitment" component={Commitment} />
				<Stack.Screen name="CreateCommitment" component={CreateCommitment} />
				<Stack.Screen name="UpdateCommitment" component={UpdateCommitment} /> */}
				<Stack.Screen name="Report" component={Report} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default MyStack;
