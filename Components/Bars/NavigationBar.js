import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";



export default function ({btnFunc,title }) {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={btnFunc}>
                <Ionicons name="chevron-back" size={30} color={AppColors.textColor} />
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
                <Text style={globalStyles.body}>s</Text>
            </View>

        </View>
    )
}