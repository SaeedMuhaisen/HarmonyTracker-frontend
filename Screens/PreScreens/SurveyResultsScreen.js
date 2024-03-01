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

export default function () {
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    const temp = {
        "activityLevel": 1.2,
        "bicepsWidest": 100,
        "birthDate": 865166400000,
        "extraData": false,
        "forearmWidest": 200,
        "gender": "male",
        "height": 170,
        "hipWidest": 70,
        "neckNarrowest": 90,
        "preferredUnit": "cm",
        "preferredWeightUnit": "kg",
        "thighWidest": 80,
        "waistNarrowest": 50,
        "waistNavel": 60,
        "weight": 80,
        "wristNarrowest": 300
    }
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await fetch(localhost + '/api/preview/macros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(temp),
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
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>
            <ScrollView contentContainerStyle={{ flex: 1, gap: 15, padding: 15 }}>
                <BmiCard/>
                <BodyDetails/>
            </ScrollView>
        </SafeAreaView>
    )
}
