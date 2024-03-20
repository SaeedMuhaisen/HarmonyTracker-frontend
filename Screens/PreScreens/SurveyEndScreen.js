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
        console.log(userDetails)
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
// <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
//     <View style={{ flex: 1, gap: 5, padding: 15, justifyContent: 'flex-start' }}>
//         <View style={{ flex: 1 }}>
//             <LoadingPieChart
//                 timer={timer}
//                 setTimer={setTimer}
//                 state={state}
//                 setState={setState}
//                 getData={getData}
//             />
//         </View>
//         <View style={{ flex: 1, gap: 12 }}>
//             <FadeInFlatList
//                 scrollEnabled={false}
//                 initialDelay={500}
//                 durationPerItem={1500}
//                 data={[{ item: 'Calculated Macros' }, { item: 'Calculated BodyFat%' }, { item: 'Optimized Calender' }, { item: 'Plan Created' }]}
//                 contentContainerStyle={{ gap: 10, alignSelf: 'center' }}
//                 renderItem={({ item }) => (
//                     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
//                         <FontAwesome6 name="circle-check" size={20} color="white" />
//                         <Text style={{ color: 'white', fontSize: 24, alignSelf: 'center' }}>{item.item}</Text>
//                     </View>
//                 )}
//             />
//             <View>
//                 {state.percent === 100 ? <NextQuestion title="Preview Plan And Details" goNext={() => navigation.navigate(ROUTES.SurveyResultsScreen)} /> : <></>}
//             </View>

//         </View>

//     </View>


// </SafeAreaView>