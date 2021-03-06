import React from 'react';
import {StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

const Fab = ({iconName, onPress, style= {}}: Props) => {
    return (
        <View style={{...style as any}}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={onPress}
                style={styles.blackButton}
            >
                <Icon
                    name={iconName}
                    color="#fff"
                    size={35}
                    style={{left: 1}}
                />
            </TouchableOpacity>
        </View>
    );
};

const styles= StyleSheet.create({
    blackButton: {
        zIndex: 999,
        height: 50,
        width: 50,
        backgroundColor: '#000',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})

export default Fab;
