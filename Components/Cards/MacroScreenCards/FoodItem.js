import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppColors } from "../../../Styles/AppColors";
import { Swipeable } from "react-native-gesture-handler";
export default function () {

    return (
       
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>

                <View>
                    <Text style={{ fontSize: 14, color: 'white' }}>Cola Zero</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>250L</Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingLeft: 30, gap: 30, flexDirection: 'row' }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: AppColors.textColor }}>1100</Text>
                        <Text style={{ fontSize: 12, color: AppColors.grayTextColor }}>cals</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: AppColors.textColor }}>1100</Text>
                        <Text style={{ fontSize: 12, color: AppColors.grayTextColor }}>carbs</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: AppColors.textColor }}>1410</Text>
                        <Text style={{ fontSize: 12, color: AppColors.grayTextColor }}>carbs</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: AppColors.textColor }}>110</Text>
                        <Text style={{ fontSize: 12, color: AppColors.grayTextColor }}>carbs</Text>
                    </View>

                </View>
            </View>
        

    )
}