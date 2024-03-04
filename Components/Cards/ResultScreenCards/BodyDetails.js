import React, { useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../GlobalStyles";
import XAxis from "../../XAxis";
import { useSelector } from "react-redux";
import LabeledInput from "../../Inputs/LabeledInput";
import LabeledSeparator from "../../Seperators/LabeledSeparator";
import { StyleSheet } from "react-native";
import PercentagePieChart from "./PercentagePieChart";
import { capitalizeFirstLetters } from "../../../utils/converters";
export default function () {
    const [width, setWidth] = useState(null)
    const result = useSelector(state => state.surveyResult.data)
    const weight = useSelector(state => state.userDetails.weight)
    return (
        <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
            <View>
                <Text style={{ ...globalStyles.title, }}>Lean & Fat Body Mass</Text>
            </View>
            <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            <View style={{ gap: 10, }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
                <View>
                    <Text style={{ ...globalStyles.title, alignSelf: 'center' }}>{weight} kg = {Math.round(weight*10 - result.leanBodyMass * 10) / 10} FM + {Math.round(result.leanBodyMass * 10) / 10} LBM  </Text>
                </View>
                <Text style={globalStyles.description}>Your Body Fat Mass Percentage: <Text style={globalStyles.body}>{Math.round(result.bodyFatPercentage * 10) / 10}%</Text></Text>
                <Text style={globalStyles.description}>Your Lean Body Mass Percentage: <Text style={globalStyles.body}>{Math.round((100 - result.bodyFatPercentage)*10) / 10}%</Text></Text>
                <Text style={globalStyles.description}>Your Fat Classification: <Text style={globalStyles.body}>{capitalizeFirstLetters(result.bodyFatMassClassificationType)}</Text></Text>
                <Text></Text>
            </View>
        </View>
    );
}