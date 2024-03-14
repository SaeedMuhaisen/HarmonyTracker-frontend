import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import { AppColors } from "../../Styles/AppColors";
export default function ({ goNext, noRadius = false, disabled,title='Continue' }) {
    return (
        <TouchableWithoutFeedback onPress={goNext} disabled={disabled} >
            <View style={{ ...globalStyles.card, borderRadius: noRadius ? 0 : globalStyles.card.borderRadius ,backgroundColor:AppColors.carbsColor}}>
                <Text style={{ color: disabled ? 'gray' : 'white', fontWeight: '700' }}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}