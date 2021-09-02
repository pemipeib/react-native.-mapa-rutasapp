import React, {useContext} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from "../pages/MapScreen";
import PermisionScreen from "../pages/PermisionScreen";
import LoadingScreen from "../pages/LoadingScreen";
import {PermissionsContext} from "../context/PermissionsContext";

const Stack = createStackNavigator();

export const Navigation = () => {

    const {permissions} = useContext(PermissionsContext);

    if (permissions.locationStatus === 'unavailable') {
        return <LoadingScreen />
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: '#fff'
                }
            }}
        >

            {
                (permissions.locationStatus === 'granted')
                ? <Stack.Screen name="MapScreen" component={MapScreen} />
                : <Stack.Screen name="PermisionScreen" component={PermisionScreen} />
            }

        </Stack.Navigator>
    );
};
