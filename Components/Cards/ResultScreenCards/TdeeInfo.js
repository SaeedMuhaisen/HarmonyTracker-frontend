import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../GlobalStyles";
import { AppColors } from "../../../Styles/AppColors";
export default function ({ title, value, chosen = false }) {

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: chosen ? AppColors.primaryYellow : undefined }}>
            <Text style={{ ...globalStyles.body, color: chosen ? 'black' : globalStyles.body.color }}>
                {title}
            </Text>
            <Text style={{ ...globalStyles.body, color: chosen ? 'black' : globalStyles.body.color }}>
                {value}
            </Text>
        </View>

    )
}

