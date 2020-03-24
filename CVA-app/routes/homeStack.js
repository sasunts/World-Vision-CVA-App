import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import firebase from "firebase";
import * as RootNavigation from "../routes/RootNavigation";
import "react-native-gesture-handler";
import AgeScreen from "../components/OnBoarding/AgeScreen";
import SexScreen from "../components/OnBoarding/SexScreen";
import OccupationScreen from "../components/OnBoarding/OccupationScreen";
import InformationScreen from "../components/OnBoarding/InformationScreen";
import ActionPlan from "../components/ActionPlans/ActionPlan";
import ActionPlanHome from "../components/ActionPlans/ActionPlanHome";
import CreateCommitment from "../components/GovtCommitments/CreateCommitment";
import GovtCommitmentsHome from "../components/GovtCommitments/GovtCommitmentsHome";
import UpdateCommitment from "../components/GovtCommitments/UpdateCommitment";
import Profile from "../components/Profile/Profile";
import Chat from "../components/Messaging/Chat";
import ChatHome from "../components/Messaging/ChatHome";
import Home from "../components/Home";
import Report from "../components/Reports/Report";
import SuggestionsHome from "../components/Suggestions/SuggestionsHome";
import CommitmentPage from "../components/GovtCommitments/CommitmentPage";
import { navigationRef, isMountedRef } from "./RootNavigation";
import Icon from "react-native-vector-icons/MaterialIcons";

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
							<TouchableOpacity
								onPress={() => RootNavigation.navigate("Profile")}
							>
								<Icon
									style={{ marginLeft: 7 }}
									name="account-circle"
									size={30}
									color="white"
								/>
								<Text
									style={{
										marginRight: 10,
										color: "white",
										fontWeight: "bold"
									}}
								>
									Profile
								</Text>
							</TouchableOpacity>
						)
					}}
				/>

				<Stack.Screen
					name="AgeScreen"
					component={AgeScreen}
					options={{
						title: "Almost there",
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
					name="SexScreen"
					component={SexScreen}
					options={{
						title: "Just about",
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
					name="OccupationScreen"
					component={OccupationScreen}
					options={{
						title: "Just one more",
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
					name="InformationScreen"
					component={InformationScreen}
					options={{
						title: "Information",
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
            },
            headerRight: ({ navigate }) => (
              <TouchableOpacity onPress={() => firebase.auth().signOut()}>
                <Icon
                  style={{ marginLeft: 10.5 }}
                  name="exit-to-app"
                  size={25}
                  color="white"
                />
                <Text
                  style={{
                    marginRight: 10,
                    color: "white",
                    fontWeight: "bold"
                  }}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            )
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
          name="Chat"
          component={Chat}
          options={{
            title: "Chat",
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
          name="ChatHome"
          component={ChatHome}
          options={{
            title: "Chat Home",
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
