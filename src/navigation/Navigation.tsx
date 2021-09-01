import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from "../pages/MapScreen";
import PermisionScreen from "../pages/PermisionScreen";
import LoadingScreen from "../pages/LoadingScreen";

const Stack = createStackNavigator();

export const Navigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="PermisionScreen" component={PermisionScreen} />
        </Stack.Navigator>
    );
};
