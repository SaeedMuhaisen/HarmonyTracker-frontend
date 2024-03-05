import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated, FlatList, KeyboardAvoidingView, Easing, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import { FontAwesome6 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { localhost } from "../../connectionConfig";
import { setResult } from "../../redux/surveyResultSlice";
import { useDispatch } from "react-redux";
import { VictoryAxis, VictoryBrushLine, VictoryChart, VictoryScatter } from "victory-native";
import XAxis from "../../Components/XAxis";
import BmiCard from "../../Components/Cards/ResultScreenCards/BmiCard";
import BodyDetails from "../../Components/Cards/ResultScreenCards/BodyDetails";
import TdeeCard from "../../Components/Cards/ResultScreenCards/TdeeCard";
import NextQuestion from "../../Components/Buttons/NextQuestion";
import ROUTES from "../../Navigation/ROUTES";
import { useNavigation } from "@react-navigation/native";
import CalorieCard from "../../Components/Cards/MacroScreenCards/CalorieCard";
import MacroPieChart from "../../Components/Cards/ResultScreenCards/MacroPieChart";

export default function () {
    const [width, setWidth] = useState(width);
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <View style={{ flex: 1, paddingHorizontal: 15, }} >
                <ScrollView contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}>
                    {
                        userDetails.goal === 0
                            ?
                            <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
                                <View>
                                    <Text style={{ ...globalStyles.title, }}>Keto Diet</Text>
                                </View>
                                <View style={{
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                }} />
                                <View style={{ gap: 10 }} >
                                    <Text style={{ ...globalStyles.description, }}>Your Macros:</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width / 4) }}>
                                        {width != null && <>
                                            <MacroPieChart
                                                title={'Calories'}
                                                value={Math.round(result.bmr * userDetails.activityLevel)}
                                                unit={'kcal'}
                                                pieColor={'white'}
                                                width={width - 2}
                                                cardColor={'#003049'}
                                                description={'Limit'}
                                            />
                                            <MacroPieChart
                                                title={'Protein'} unit={'grams'}
                                                width={width - 2} value={Math.round(result.leanBodyMass*1.763696)}
                                                pieColor={'white'} cardColor={'#5068a4'}
                                                description={'Goal'}

                                            />
                                            <MacroPieChart title={'Carbs'} value={Math.round(result.bmr * userDetails.activityLevel*0.05/4)} unit={'grams'} pieColor={'white'} width={width - 2} cardColor={'#F83A46'} description={'Limit'}
                                            />
                                            <MacroPieChart title={'Fat'} value={Math.round(result.bmr * userDetails.activityLevel*0.7/9)} unit={'grams'} pieColor={'white'} width={width - 2} cardColor={'#E8A020'} description={'Limit'} />
                                        </>
                                        }
                                    </View>
                                </View>

                            </View>
                            :
                            <></>
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
};