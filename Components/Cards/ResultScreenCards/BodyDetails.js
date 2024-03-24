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
export default function () {
    const [width, setWidth] = useState(null)
    const result = useSelector(state => state.surveyResult)
    const weight = useSelector(state => state.userDetails.weight)
    return (
        <View style={{ gap: 15 }}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                <Text style={{ ...globalStyles.body, textAlign: 'center' }}>{weight} kg {'\n'}<Text style={{ fontSize: 12, }}>Your weight</Text></Text>
                <Text>=</Text>
                <Text style={{ ...globalStyles.description, textAlign: 'center', fontSize: 16 }}>{Math.round(weight * 10 - result.leanBodyMass * 10) / 10} KG {'\n'}<Text style={{ ...globalStyles.description, fontSize: 12, color: AppColors.carbsColor }}>Fat Mass</Text></Text>
                <Text>+</Text>
                <Text style={{ ...globalStyles.body, textAlign: 'center' }}>{Math.round(result.leanBodyMass * 10) / 10} KG {'\n'}<Text style={{ fontSize: 12 }}>Lean Body Mass</Text></Text>
            </View>
            <Text style={{ ...globalStyles.body, }}>
                Based on your input we estimate that your body fat makes up <Text style={{ ...globalStyles.title, fontSize: globalStyles.body.fontSize }}>{Math.round(result.bodyFatPercentage * 10) / 10}% </Text>
                of your total weight. This means that approximately
                the total amount of fat inside your body is
                <Text style={{ ...globalStyles.title, fontSize: globalStyles.body.fontSize }}> {Math.round(weight * 10 - result.leanBodyMass * 10) / 10} kg </Text>
                This amount is classified as
                <Text style={{ ...globalStyles.title, fontSize: globalStyles.body.fontSize }}> {capitalizeFirstLetters(result.bodyFatMassClassificationType)}</Text>
            </Text>
        </View>
    );
}