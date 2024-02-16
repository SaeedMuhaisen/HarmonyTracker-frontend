import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../../GlobalStyles";
export default function ({ goNext, noRadius = false, disabled }) {
    return (
        <TouchableWithoutFeedback onPress={goNext} disabled={disabled}>
            <View style={{ ...globalStyles.card, borderRadius: noRadius ? 0 : globalStyles.card.borderRadius }}>
                <Text style={{ color: disabled ? 'gray' : 'white', fontWeight: '700' }}>Continue</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}