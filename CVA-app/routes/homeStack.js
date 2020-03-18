import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import ActionPlan from "../components/ActionPlans/ActionPlan";
import ActionPlanHome from "../components/ActionPlans/ActionPlanHome";
import CreateCommitment from "../components/GovtCommitments/CreateCommitment";
import GovtCommitmentsHome from "../components/GovtCommitments/GovtCommitmentsHome";
import UpdateCommitment from "../components/GovtCommitments/UpdateCommitment";
import Profile from "../components/Profile/Profile";
import Home from "../components/Home";
import Report from "../components/Reports/Report";
import SuggestionsHome from "../components/Suggestions/SuggestionsHome";
import CommitmentPage from "../components/GovtCommitments/CommitmentPage";
import { navigationRef, isMountedRef } from "./RootNavigation";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator();

function MyStack() {
  React.useEffect(() => {
    isMountedRef.current = true;

    return () => (isMountedRef.current = false);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            },
            headerRight: ({ navigate }) => (
              <TouchableOpacity>
                <Icon style={{ marginRight: 5 }} name="account-circle" size={40} color="white" />
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "My Profile",
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Stack.Screen
          name="Action-Plan"
          component={ActionPlanHome}
          options={{
            title: "Action Plans",
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Stack.Screen
          name="ActionPlan"
          component={ActionPlan}
          options={({ route }) => ({
            title: route.params.list?.title,
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          })}
        />
        <Stack.Screen
          name="Govt-Commitments-Home"
          component={GovtCommitmentsHome}
          options={{
            title: "Government Commitments",
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Stack.Screen
          name="CommitmentPage"
          component={CommitmentPage}
          options={({ route }) => ({
            title: route.params.details?.title,
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          })}
        />
        <Stack.Screen
          name="SuggestionsHome"
          component={SuggestionsHome}
          options={{
            title: "SuggestionsHome",
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
        <Stack.Screen name="UpdateCommitment" component={UpdateCommitment} />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerStyle: {
              backgroundColor: "#ff7800"
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold"
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
