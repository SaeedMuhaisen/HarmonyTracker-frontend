import React, { useState, } from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView, View, } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import { useSelector } from "react-redux";
import Slider from '@react-native-community/slider';

import UserMacrosPie from "../../Components/Cards/ResultScreenCards/UserMacrosPie";
import SingleMacro from "../../Components/Cards/ResultScreenCards/SingleMacro";
import DietGraph from "../../Components/Cards/ResultScreenCards/DietGraph";
import Graph from "../../Components/Graph";
import NextQuestion from "../../Components/Buttons/NextQuestion";
import ROUTES from "../../Navigation/ROUTES";
import { useNavigation } from "@react-navigation/native";
import { setMacros } from "../../redux/macroSlice";
import store from "../../redux/store";
export default function () {
    const navigation = useNavigation();
    const [width, setWidth] = useState(width);
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)

    const initialTdee = result.bmr * userDetails.activityLevel
    const carbs = initialTdee * 0.05 / 4
    const protein = result.leanBodyMass * 1.763696
    const carbsAndProteinCal = protein * 4 + carbs * 4;

    const [deficet, setDeficet] = useState(Math.round(initialTdee * 0.3));
    const [updatedDeficit, setUpdatedDeficit] = useState(0)
    const [tdee, setTdee] = useState(initialTdee);
    const [fat, setFat] = useState(initialTdee * 0.7 / 9)

    const handleDeficitChange = (value) => {
        setDeficet(value);
        setTdee(initialTdee - value)
        setFat((initialTdee - value - carbsAndProteinCal) / 9)
    }

    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <View style={{ flex: 1, paddingHorizontal: 15, }} >
                <ScrollView contentContainerStyle={{ gap: 10 }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }} showsVerticalScrollIndicator={false}>
                    <View style={{ ...globalStyles.showdedCard, gap: 15, }}>
                        <View>
                            <Text style={{ ...globalStyles.title, }}>Your Keto Plan</Text>
                        </View>
                        <View style={{
                            borderBottomColor: 'gray',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }} />

                        <View style={{ gap: 20 }} >
                            {tdee !== null && fat !== null && carbs !== null &&
                                <UserMacrosPie calories={tdee} fat={fat} carbs={carbs} protein={protein} />
                            }


                            <View style={{ gap: 5 }}>

                                <Text style={{ ...globalStyles.description }}>Macros</Text>
                                <View style={{ flexDirection: 'row', borderRadius: 20, gap: 60 }}>
                                    <View style={{ flex: 1, }}>
                                        <SingleMacro title={'Protein'} color={AppColors.proteinColor} value={protein} percentage={'70'} />
                                    </View>
                                    <View style={{ flex: 1, }}>
                                        <SingleMacro title={'Carbs'} color={AppColors.carbsColor} value={carbs} percentage={'5'} />
                                    </View>
                                    <View style={{ flex: 1, }}>
                                        <SingleMacro title={'Fat'} color={AppColors.fatColor} value={fat} percentage={'25'} />
                                    </View>

                                </View>
                            </View>

                            <View style={{ gap: 5 }}>
                                <View style={{ gap: 5 }}>


                                    <Text style={globalStyles.description}>Increase Your Daily Deficit</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 10, }}>
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRightWidth: StyleSheet.hairlineWidth, borderColor: 'gray' }}>
                                            <Text style={{ ...globalStyles.description }}>
                                                Deficit
                                            </Text>
                                            <Text style={{ ...globalStyles.body }}>
                                                {Math.round(100 - (initialTdee - deficet) * 100 / initialTdee)} %
                                            </Text >


                                        </View>

                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={{ ...globalStyles.description }}>
                                                Kg/Week
                                            </Text>
                                            <Text style={{ ...globalStyles.body }}>
                                                {Math.round(deficet * 0.00013 * 7 * 100) / 100}
                                            </Text>

                                        </View>

                                    </View>
                                </View>
                                <View>
                                    <Slider

                                        height={35}
                                        minimumTrackTintColor={AppColors.proteinColor}
                                        maximumTrackTintColor={'gray'}
                                        thumbTintColor={'white'}
                                        minimumValue={0}
                                        maximumValue={Math.ceil(initialTdee * 0.4)}
                                        step={1}
                                        value={deficet}
                                        onValueChange={handleDeficitChange}
                                        onSlidingComplete={(value) => { setUpdatedDeficit(Math.round(deficet * 0.00013 * 30 * 100) / 100) }}
                                    />
                                </View>
                            </View>

                        </View>
                        {/* <View >
                                    <DietGraph deficit={updatedDeficit} initialWeight={userDetails.weight} bmi={result.bmi} height={userDetails.height} bodyFat={result.bodyFatMass}/>
                                </View> */}
                        <View>
                            <Graph deficit={updatedDeficit} initialWeight={userDetails.weight} bmi={result.bmi} height={userDetails.height} bodyFat={result.bodyFatMass} />
                        </View>

                    </View>
                    <View style={{ height: 25 }} />
                </ScrollView>
                <View>
                    <NextQuestion title="Lets get started!" goNext={
                        () => {
                            store.dispatch(setMacros({
                                protein: protein,
                                fat: fat,
                                carbs: carbs,
                                calories: tdee,
                            }))

                            navigation.navigate(ROUTES.SignUpToContinueScreen)
                        }
                    } />
                </View>
            </View >
        </SafeAreaView >
    )
}
const data = [
    {
        name: "Seoul",
        population: 21500000,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Toronto",
        population: 2800000,
        color: "#F00",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Beijing",
        population: 527612,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "New York",
        population: 8538000,
        color: "#ffffff",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    },
    {
        name: "Moscow",
        population: 11920000,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
    }
];