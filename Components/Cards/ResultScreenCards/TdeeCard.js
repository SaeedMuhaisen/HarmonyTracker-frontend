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
import { AppColors } from "../../../Styles/AppColors";
import TdeeInfo from "./TdeeInfo";
export default function () {
    const [width, setWidth] = useState(null)
    const result = useSelector(state => state.surveyResult.data)
    const weight = useSelector(state => state.userDetails.weight)
    return (
        <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
            <View>
                <Text style={{ ...globalStyles.title, }}>Total Daily Energy Expenditure - TDEE</Text>
            </View>
            <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            <View style={{ gap: 10, }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
                <TdeeInfo title='Basal Metabolic Rate:' value={`${Math.round(result.bmr)} calories/day`} />
                <TdeeInfo title='Sedentary:' value={`${Math.round(result.bmr * 1.2)} calories/day`} chosen />
                <TdeeInfo title='Light Exercise:' value={`${Math.round(result.bmr * 1.375)} calories/day`} />
                <TdeeInfo title='Moderate Exercise:' value={`${Math.round(result.bmr * 1.55)} calories/day`} />
                <TdeeInfo title='Heavy Exercise:' value={`${Math.round(result.bmr * 1.725)} calories/day`} />
                <TdeeInfo title='Athlete:' value={`${Math.round(result.bmr * 1.9)} calories/day`} />
            </View>
            <Text style={{ ...globalStyles.body, fontSize: 12, textAlign: 'justify' }}>
                note: For most accurate results its usually recommend to chose Sedentary
                TDEE and add extra calories manually after working out. Unless you work
                a physical job, its always the most accurate choice to chose is Sedentary</Text>
        </View>
    );
}