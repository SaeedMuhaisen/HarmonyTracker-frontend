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
import DietGraph from "../../Components/Cards/ResultScreenCards/DietGraph";
const data = [
    { id: 0, title: '0%', value: 1.0 },
    { id: 1, title: '10%', value: 0.9 },
    { id: 2, title: '20%', value: 0.8 },
    { id: 3, title: '30%', value: 0.7 },
    { id: 4, title: '40%', value: 0.6 },
];

export default function () {
    const [width, setWidth] = useState(width);
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)
    const [deficet, setDeficet] = useState(0);
    const initialTdee = result.bmr * userDetails.activityLevel
    const initalFat = initialTdee * 0.7 / 9
    const [tdee, setTdee] = useState(initialTdee);
    const [carbs, setCarbs] = useState(initialTdee * 0.05 / 4)
    const [protein, setProtein] = useState(result.leanBodyMass * 1.763696)
    const [fat, setFat] = useState(initialTdee * 0.7 / 9)
    const navigation = useNavigation();
    const carbsAndProteinCal = protein * 4 + carbs * 4;
    const [selectedButton, setSelectedButton] = useState(0);
    const handleButtonPress = (key) => {
        setSelectedButton(key);
    };
    useEffect(() => {
        const updateTdee = () => {
            setTdee(initialTdee * data[selectedButton].value)
            setFat((initialTdee * data[selectedButton].value - carbsAndProteinCal) / 9)
            setDeficet(initialTdee - initialTdee * data[selectedButton].value)
        }
        updateTdee();
    }, [selectedButton])

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
                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5 }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
                                        {width != null && <>
                                            <MacroPieChart
                                                title={'Calories'}
                                                value={Math.round(tdee)}
                                                unit={'kcal'}
                                                pieColor={'white'}
                                                width={width / 4 - 2}
                                                cardColor={'#003049'}
                                                description={'Limit'}
                                            />
                                            <MacroPieChart
                                                title={'Protein'} unit={'grams'}
                                                width={width / 4 - 2} value={Math.round(protein)}
                                                pieColor={'white'} cardColor={'#5068a4'}
                                                description={'Goal'}

                                            />
                                            <MacroPieChart title={'Carbs'} value={Math.round(carbs)} unit={'grams'} pieColor={'white'} width={width / 4 - 2} cardColor={'#F83A46'} description={'Limit'}
                                            />
                                            <MacroPieChart title={'Fat'} value={Math.round(fat)} unit={'grams'} pieColor={'white'} width={width / 4 - 2} cardColor={'#E8A020'} description={'Limit'} />
                                        </>
                                        }
                                    </View>
                                    <Text style={{ ...globalStyles.description }}>Change Deficet:</Text>
                                    <View style={{ flexDirection: 'row', gap: 10, flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                        {data.map(({ id, title }) => (

                                            <TouchableWithoutFeedback
                                                key={id}
                                                onPress={() => handleButtonPress(id)}
                                                style={{

                                                    borderRadius: 10,
                                                    backgroundColor: selectedButton === id ? 'blue' : 'tomato',
                                                    alignItems: 'center',


                                                }}
                                            ><View style={{
                                                flex: 1,
                                                borderRadius: 10,
                                                backgroundColor: selectedButton === id ? AppColors.primaryYellow : AppColors.SecondaryYellow,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 50,
                                                width: 50,
                                            }}>
                                                    <Text style={{ ...globalStyles.description, color: 'black', fontWeight: selectedButton === id ? '700' : globalStyles.description.fontWeight }}>{title}</Text>
                                                </View>
                                            </TouchableWithoutFeedback>

                                        ))}
                                    </View>
                                    <View>
                                        <Text style={globalStyles.description}>Diet Details:</Text>
                                        <Text style={globalStyles.body}>Weekly Weight Loss: {Math.round(deficet * 0.00013 * 7 * 100) / 100} kg</Text>
                                        <Text style={globalStyles.body}>Monthly Weight Loss: {Math.round(deficet * 0.00013 * 31 * 100) / 100} kg</Text>
                                        
                                        <Text />
                                    </View>
                                    <View>
                                        <DietGraph width={width} initialWeight={userDetails.weight} deficit={data[selectedButton].value} bmi={result.bmi} height={userDetails.height}/>
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
}