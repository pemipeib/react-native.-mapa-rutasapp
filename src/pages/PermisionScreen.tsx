import React, {useContext} from 'react';
import {Platform, StyleSheet, Text, View} from "react-native";

import {PermissionsContext} from "../context/PermissionsContext";
import BlackButton from "../components/BlackButton";

const PermisionScreen = () => {

    const {permissions, askLocationPermission} = useContext(PermissionsContext);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Es necesario el uso del GPS</Text>

            <BlackButton title="Permiso" onPress={askLocationPermission} />

            <Text>{JSON.stringify(permissions, null, 5)}</Text>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        width: 200,
        fontSize: 20,
        textAlign: 'center',
    }
})

export default PermisionScreen;
