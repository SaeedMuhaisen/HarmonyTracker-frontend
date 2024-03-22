import React, { useEffect, } from "react";
import { Text, StyleSheet, ScrollView, SafeAreaView, View, Platform } from "react-native";
import { Image } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import { useSelector } from "react-redux";
import { localhost } from "../../connectionConfig";
import { setResult } from "../../redux/surveyResultSlice";
import { useDispatch } from "react-redux";
import BmiCard from "../../Components/Cards/ResultScreenCards/BmiCard";
import BodyDetails from "../../Components/Cards/ResultScreenCards/BodyDetails";
import TdeeCard from "../../Components/Cards/ResultScreenCards/TdeeCard";
import NextQuestion from "../../Components/Buttons/NextQuestion";
import ROUTES from "../../Navigation/ROUTES";
import { useNavigation } from "@react-navigation/native";
import harmony from '../../assets/Logo.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CardHeader from "../../Components/Cards/CardHeader";
import BmiGoal from "../../Components/Goals/BmiGoal";
import FatGoal from "../../Components/Goals/FatGoal";
import { FontAwesome5 } from '@expo/vector-icons';
import DietPlanScreen from "./DietPlanScreen";

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
                        <CardHeader title={'Understand your position'} titleHeader={'STEP 1'} icon={<MaterialCommunityIcons name="head-question-outline" size={40} color="black" />} />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <BmiCard />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <BodyDetails />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <TdeeCard />
                    </View>

                    <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
                        <CardHeader title={'The Goal'} titleHeader={'STEP 2'} icon={<MaterialCommunityIcons name="bullseye-arrow" size={40} color="black" />} />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <BmiGoal bmi={result.bmi} weight={userDetails.weight} height={userDetails.height} />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <FatGoal />
                    </View>
                    <View style={{ ...globalStyles.showdedCard, gap: 15 }}>
                        <CardHeader title={'The Plan'} titleHeader={'STEP 3'} icon={<FontAwesome5 name="route" size={40} color="black" />} />
                        <View style={{ borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth }} />
                        <DietPlanScreen />
                    </View>
                    <View style={{ height: 10 }} />
                </ScrollView>
                <View style={{ paddingHorizontal: 10 }}>
                    <NextQuestion title="Lets get started!" goNext={
                        () => {
                            navigation.navigate(ROUTES.SignUpToContinueScreen)
                        }
                    } />
                </View>
            </View>
        </SafeAreaView >
    )
}
