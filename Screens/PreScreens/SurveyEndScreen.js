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
import { PreviewServices } from "../../utils/Functions/PreviewServices";
import * as SecureStore from 'expo-secure-store';
export default function () {
    const userDetails = useSelector(state => state.userDetails)
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const result = useSelector(state => state.surveyResult)
    useEffect(() => {
        const finished = () => {
            
            navigation.navigate(ROUTES.SurveyResultsScreen)
        }

        const prev = new PreviewServices()
        const calc = async () => {
            const temp = prev.createMacroPlan(userDetails);
            const serializableData = {
                bmi: temp.bmi,
                bmiClassificationType: temp.bmiClassificationType,
                bodyFatPercentage: temp.bodyFatPercentage,
                bfpType: temp.bfpType,
                bodyFatMass: temp.bodyFatMass,
                bodyFatMassClassificationType: temp.bodyFatMassClassificationType,
                leanBodyMass: temp.leanBodyMass,
                bmr: temp.bmr,
                bmrType: temp.bmrType,
            };
            dispatch(setResult(serializableData));
            await SecureStore.setItemAsync('SURVEYRESULT', JSON.stringify(temp));
            setTimeout(finished,3000)
        }
        calc()
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