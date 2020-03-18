import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as React from "react";
import NameScreen from "../components/OnBoarding/NameScreen";
import AgeScreen from "../components/OnBoarding/AgeScreen";
import SexScreen from "../components/OnBoarding/SexScreen";
import OccupationScreen from "../components/OnBoarding/OccupationScreen";
import InformationScreen from "../components/OnBoarding/InformationScreen";
import Home from "../components/Home";
import { navigationRef, isMountedRef } from "./RootNavigation";


const Stack = createStackNavigator();

function OnBoardingStack() {
    React.useEffect(() => {
        isMountedRef.current = true;

        return () => (isMountedRef.current = false);
    }, []);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen
                    name="NameScreen"
                    component={NameScreen}
                    options={{
                        title: "Welcome",
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
                            <TouchableOpacity onPress={() =>
                                RootNavigation.navigate("Profile")
                            }>
                                <Icon style={{ marginLeft: 7 }} name="account-circle" size={30} color="white" />
                                <Text style={{ marginRight: 10, color: "white", fontWeight: "bold" }}>Profile</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default OnBoardingStack;
