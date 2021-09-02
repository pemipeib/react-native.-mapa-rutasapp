import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const BlackButton = ({title, onPress, style= {}}: Props) => {
    return (
        <TouchableOpacity
            style={{
                ...style as any,
                ...styles.blackButton,
            }}
            activeOpacity={.9}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles= StyleSheet.create({
    blackButton: {
        height: 45,
        width: 200,
        backgroundColor: '#000',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18
    }
})

export default BlackButton;
