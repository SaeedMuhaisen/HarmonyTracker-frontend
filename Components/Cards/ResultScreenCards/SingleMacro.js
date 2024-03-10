import React from "react";
import { View, Text, TextInput, } from "react-native";
import { AppColors } from "../../../Styles/AppColors";
import { globalStyles } from "../../../GlobalStyles";
export default function ({ title, color, value, percentage }) {
    return (
        <View style={{ gap: 5, }}>
            <Text style={{ textAlign: 'left', ...globalStyles.body }}>{title}</Text>

            <View style={{
                backgroundColor: 'transparent',
                padding: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: color
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text style={{ ...globalStyles.description, textAlign: 'center', flex: 1 }}>{Math.round(value)}</Text>
                    <Text style={{ ...globalStyles.description, textAlign: 'center', flex: 0.5 }}>g</Text>
                </View>

            </View>

            <View style={{ alignItems: 'flex-start' }}>
                <View style={{
                    alignItems: 'flex-start',
                    backgroundColor: color,
                    paddingHorizontal: 4,
                    borderRadius: 10,
                }}>
                    <Text style={{ ...globalStyles.body }}>{percentage}%</Text>
                </View>
            </View>
        </View>
    )
}