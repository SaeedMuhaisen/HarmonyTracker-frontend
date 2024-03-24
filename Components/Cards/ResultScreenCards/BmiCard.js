import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../GlobalStyles";
import XAxis from "../../XAxis";
import { useSelector } from "react-redux";
import LabeledInput from "../../Inputs/LabeledInput";
import LabeledSeparator from "../../Seperators/LabeledSeparator";
import { StyleSheet } from "react-native";
import { capitalizeFirstLetters } from "../../../utils/converters";
export default function () {
    const result = useSelector(state => state.surveyResult)
    return (
        <View style={{gap:10,}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, }}>
                <Text style={{ ...globalStyles.body, }}>
                    Your Body Mass Index is <Text style={{ ...globalStyles.title, fontSize: globalStyles.body.fontSize }}>
                        {Math.round(result.bmi * 10) / 10}
                    </Text> which classifies you as <Text style={{ ...globalStyles.title, fontSize: globalStyles.body.fontSize }}>
                        {capitalizeFirstLetters(result.bmiClassificationType)}
                    </Text>
                </Text>
            </View>
            <View >
                <XAxis outerPaddingSize={globalStyles.card.padding} pointerPos={result.bmi} />
                <Text style={{ ...globalStyles.body, fontSize: 12, textAlign: 'center' }}>Your position on the body mass index chart</Text>
            </View>
        </View>
    );
}