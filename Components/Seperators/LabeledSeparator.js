import React from "react";
import { View, Text,StyleSheet } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";

export default function ({ text }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, }}>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />

            <Text style={{ ...globalStyles.body }}  >
                {text}
            </Text>
            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />
        </View>
    )
}