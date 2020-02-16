import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../components/Home';
import ActionPlanHome from '../components/ActionPlans/ActionPlanHome'

const Stack = createStackNavigator();

function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Action-Plan" component={ActionPlanHome} />
            </Stack.Navigator>
      </NavigationContainer>
    );
  }



export default MyStack;