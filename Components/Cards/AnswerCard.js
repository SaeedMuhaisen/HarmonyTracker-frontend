import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ({ title,func }) {
    return (
        <TouchableOpacity onPress={func}>
            <View style={{ backgroundColor: 'purple' }}>
                <Text>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}