import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, Animated, FlatList, KeyboardAvoidingView, Easing, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import LoadingPieChart from "../../Components/LoadingPieChart";
import { Scale } from "victory-native";
import FadeInFlatList from "../../Components/ReAnimatedComps/FadeInFlatList";
import { FontAwesome6 } from '@expo/vector-icons';
import NextQuestion from "../../Components/Buttons/NextQuestion";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/ROUTES";
import { useDispatch, useSelector } from "react-redux";
import { localhost } from "../../connectionConfig";
import { setResult } from "../../redux/surveyResultSlice";
import OuterContainer from "../../Components/Views/OuterContainer";
import LoadingComponent from "../../Components/Loading/LoadingComponent";
import LoadingText from "../../Components/Loading/LoadingText";

export default function () {
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        
        const finished = () => {
            navigation.navigate(ROUTES.SurveyResultsScreen)
        }
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
                    console.log(responseData)
                    setTimeout(finished, 3000)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);




    return (
        <OuterContainer>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                    <LoadingText textList={['Chopping your data', 'Adding Onions', 'Creating your Plan', 'Removing Onions']} />
                </View>
                <View style={{}}>
                    <LoadingComponent />
                </View>
            </View>
        </OuterContainer>
    );
}