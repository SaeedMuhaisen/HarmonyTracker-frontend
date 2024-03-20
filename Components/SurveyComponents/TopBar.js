import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { ProgressBar } from "react-native-paper";
import { AppColors } from "../../Styles/AppColors";

export default function ({ progress, btnFunc, }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={btnFunc}>
                <Ionicons name="chevron-back" size={30} color={AppColors.textColor} />
            </TouchableOpacity>
            <View style={{ flex: 2 }}>
                <ProgressBar style={{ backgroundColor: 'gray' }} progress={progress} color={AppColors.carbsColor} />
            </View>
            <View style={{ flex: 1 }}>
            </View>

        </View>
    )
}