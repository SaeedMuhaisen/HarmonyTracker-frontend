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
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <View style={{ flex: 1, paddingHorizontal: 15, }} >
                <ScrollView contentContainerStyle={{ gap: 10 }} showsVerticalScrollIndicator={false}>
                    <BmiCard />
                    <BodyDetails />
                    <TdeeCard />
                    <View style={{height:10}}/>
                </ScrollView>
                <NextQuestion title="Preview Your Plan" goNext={() => navigation.navigate(ROUTES.DietPlansScreen)} />
            </View>
        </SafeAreaView>
    )
}
