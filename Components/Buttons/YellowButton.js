import React from "react";
import { TouchableOpacity,Text,View } from "react-native";
import { AppColors } from "../../Styles/AppColors";
export default function ({ title,func }) {
    return (
        <TouchableOpacity onPress={func} style={{ backgroundColor: AppColors.primaryYellow, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: AppColors.backgroundColor }}>{title}</Text>
        </TouchableOpacity>
    )
}