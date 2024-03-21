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
import BodyDetails from "./BodyDetails";
import UserMacrosPie from "./UserMacrosPie";
export default function () {
    const [width, setWidth] = useState(null)
    const result = useSelector(state => state.surveyResult.data)
    const bodyDetails = useSelector(state => state.userDetails)
    const weight = useSelector(state => state.userDetails.weight)
    return (
        <View style={{ gap: 15 }}>
            <Text style={{ ...globalStyles.body, }}>Your total daily energy expenditure based on your input is:</Text>
            <View style={{ width: '50%', alignSelf: 'center' }}>
                <UserMacrosPie calories={Math.round(result.bmr * bodyDetails.activityLevel)} protein={9} fat={4} carbs={9} />
            </View>
            <View style={{ gap: 10, }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
                <TdeeInfo title='Basal Metabolic Rate:' value={`${Math.round(result.bmr)} calories/day`} />
                <TdeeInfo title='Constricted LifeStyle:' value={`${Math.round(result.bmr * 1.1)} calories/day`} chosen={bodyDetails.activityLevel === 1.1} />
                <TdeeInfo title='Work from Home LifeStyle:' value={`${Math.round(result.bmr * 1.16)} calories/day`} chosen={bodyDetails.activityLevel === 1.16} />
                <TdeeInfo title='Sedentary Activity:' value={`${Math.round(result.bmr * 1.2)} calories/day`} chosen={bodyDetails.activityLevel === 1.2} />
                <TdeeInfo title='Slightly Active:' value={`${Math.round(result.bmr * 1.375)} calories/day`} chosen={bodyDetails.activityLevel === 1.375} />
                <TdeeInfo title='Lightly Active:' value={`${Math.round(result.bmr * 1.425)} calories/day`} chosen={bodyDetails.activityLevel === 1.425} />
                <TdeeInfo title='Moderately Active' value={`${Math.round(result.bmr * 1.55)} calories/day`} chosen={bodyDetails.activityLevel === 1.55} />
                <TdeeInfo title='Very Active:' value={`${Math.round(result.bmr * 1.725)} calories/day`} chosen={bodyDetails.activityLevel === 1.725} />
                <TdeeInfo title='Extremely Active' value={`${Math.round(result.bmr * 1.9)} calories/day`} chosen={bodyDetails.activityLevel === 1.9} />
            </View>
            {/* <Text style={{ ...globalStyles.body, fontSize: 12, textAlign: 'justify' }}>
                note: For most accurate results its usually recommend to chose Sedentary
                TDEE and add extra calories manually after working out. Unless you work
                a physical job, its always the most accurate choice to chose is Sedentary</Text> */}
            <Text style={{ ...globalStyles.body, fontSize: 12, textAlign: 'justify', color: AppColors.SecondaryYellow }}>
                note: Most of the time people overestimate this part, TDEE directly affects your diet and weight loss journy, especially for people who chose to
                lose small amount of weight per week.
                If you believe you've made a mistake and overestimated your activity level you can always change your activity level from inside the app and your diet plan will immediatly be changed for you.
            </Text>

        </View>
    );
}