import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../../GlobalStyles";
export default function ({goNext}) {
    return (
        <TouchableWithoutFeedback onPress={goNext}>
            <View style={{ ...globalStyles.card }}>
                <Text style={{ color: 'white', fontWeight: '700' }}>Continue</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}