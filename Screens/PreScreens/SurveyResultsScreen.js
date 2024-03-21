import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated, FlatList, KeyboardAvoidingView, Easing, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";
import { Image } from "react-native";

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
import OuterContainer from "../../Components/Views/OuterContainer";
import harmony from '../../assets/Logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CardHeader from "../../Components/Cards/CardHeader";
export default function () {
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(localhost + '/api/preview/macros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDetails),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else {
                    const responseData = await response.json();
                    dispatch(setResult(responseData));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, }}>
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingTop: 10, gap: 10, paddingHorizontal: 10 }} showsVerticalScrollIndicator={false} >
                    <View style={{ alignItems: 'center', paddingVertical: 20, }}>
                        <Image source={harmony} style={{ height: 80, width: 80, borderRadius: 20 }} />
                        <View style={{ paddingHorizontal: 23, gap: 10, }}>
                            <Text style={{ ...globalStyles.body, fontSize: 25, textAlign: 'center' }}>Your <Text style={{ ...globalStyles.description, fontSize: 25 }}>Plan</Text> is ready!</Text>
                            <Text style={{ ...globalStyles.body, textAlign: 'center', }}>We have calculated your plan based on your body details. Your journy begins with understanding where you are at right now and where you want to reach!</Text>
                        </View>
                    </View>
                    <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
                        <CardHeader title={'Understand your position'} titleHeader={'STEP 1'} icon={<MaterialCommunityIcons name="head-question-outline" size={40} color="black" />}
                        />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />

                        <BmiCard />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />

                        <BodyDetails />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <TdeeCard />
                    </View>

                    <View style={{ height: 10 }} />
                </ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <NextQuestion title="Preview Your Plan" goNext={() => navigation.navigate(ROUTES.DietPlansScreen)} />
                </View>
            </View>
        </SafeAreaView >
    )
}
