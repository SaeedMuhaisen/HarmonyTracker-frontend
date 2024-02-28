import React from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../../GlobalStyles";
import XAxis from "../../XAxis";
import { useSelector } from "react-redux";
import LabeledInput from "../../Inputs/LabeledInput";
import LabeledSeparator from "../../Seperators/LabeledSeparator";
import { StyleSheet } from "react-native";
export default function () {
    const result = useSelector(state => state.surveyResult.data)
    return (
        <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
            <View>
                <Text style={{ ...globalStyles.title, }}>Body Mass Index </Text>
            </View>
            <View style={{
                borderBottomColor: 'gray',
                borderBottomWidth: StyleSheet.hairlineWidth,
            }} />
            <View style={{ gap: 10, }}>

                <XAxis outerPaddingSize={globalStyles.card.padding} pointerPos={result.bmi} />
                <Text style={globalStyles.description}>Your Bmi: <Text style={globalStyles.body}>{Math.round(result.bmi * 10) / 10}</Text></Text>


                <Text style={globalStyles.description}>Classification: <Text style={globalStyles.body}>{result.bmiClassificationType}</Text></Text>


            </View>



        </View>
    );
}