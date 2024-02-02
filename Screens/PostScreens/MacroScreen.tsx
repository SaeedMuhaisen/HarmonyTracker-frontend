import React, { useCallback } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../GlobalStyles";
import { VictoryContainer, VictoryPie } from 'victory-native'
import { EvilIcons } from '@expo/vector-icons';


import Svg, { Circle } from 'react-native-svg';
import PieChart from "../../Components/PieChart";
import PieChartLarge from "../../Components/PieChartLarge";
import CalorieCard from "../../Components/Cards/MacroScreenCards/CalorieCard";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";
export default function () {
    const getCurrentDate = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const d = new Date();
        const day = new Date().getDay();
        return (monthNames[d.getMonth()] + ' ' + day);

    }
    return (
        <SafeAreaView style={{ flex: 1,gap:10 }}>
            <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: '800', color: '#DE4835' }}>Today</Text>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#DE4835' }}>{' ' + getCurrentDate()}</Text>
                </View>
                <TouchableWithoutFeedback >
                    <EvilIcons name="calendar" size={35} color='#DE4835' />
                </TouchableWithoutFeedback>

            </View>
            <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            <View style={{ paddingVertical: 10 }}>
                <CalorieCard />
            </View>

        </SafeAreaView>


    )
}

