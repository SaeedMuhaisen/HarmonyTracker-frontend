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

export default function () {
    const result = useSelector(state => state.surveyResult.data)
    const userDetails = useSelector(state => state.userDetails)
    const [width, setWidth] = useState(null);
    const dispatch = useDispatch();
    const temp = {
        "activityLevel": 1.1,
        "bicepsWidest": 32.5,
        "birthDate": 860932800000,
        "extraData": true,
        "forearmWidest": 26.5,
        "gender": "male",
        "height": 173,
        "hipWidest": 105,
        "neckNarrowest": 39.8,
        "preferredUnit": "cm",
        "preferredWeightUnit": "kg",
        "thighWidest": 59.5,
        "waistNarrowest": 95.5,
        "waistNavel": 96.5,
        "weight": 83,
        "wristNarrowest": 15.5
    }
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
            <ScrollView onLayout={(event) => setWidth(event.nativeEvent.layout.width)} contentContainerStyle={{ gap: 15, padding: 15 }}>
                <BmiCard />
                <BodyDetails />
                {width !== null &&
                    <ScrollView horizontal={true} contentContainerStyle={{ gap: 15 }} >
                        <View style={{ width: width - 30 }}>
                            <TdeeCard />
                        </View>
                    </ScrollView>
                }

            </ScrollView>
        </SafeAreaView>
    )
}
