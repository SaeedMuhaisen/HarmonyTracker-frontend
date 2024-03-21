import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import { AppColors } from "../../Styles/AppColors";
export default function ({ title, titleHeader, icon }) {
    return (
        <View style={{ flexDirection: 'row', gap: 5, flex: 1 }}>
            {icon}
            <View style={{}}>
                <Text style={{ ...globalStyles.description, fontSize: 12, color: AppColors.carbsColor }}>
                    {titleHeader}
                </Text>
                <Text style={{ ...globalStyles.title }}>
                    {title}
                </Text>
            </View>
        </View>
    )
}