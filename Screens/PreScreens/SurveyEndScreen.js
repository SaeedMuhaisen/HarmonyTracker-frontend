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
import { useSelector } from "react-redux";
import { localhost } from "../../connectionConfig";

export default function () {


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(localhost + '/api/preview/macros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDetails),
            });
        }
        fetchData();
    }, [])
    const navigation = useNavigation();
    const [timer, setTimer] = useState(1000);
    const getData = (percent) => {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    };
    const [state, setState] = useState({
        percent: 1,
        data: getData(0)
    });

    const user = useSelector(state => state.user);
    const handleNav = () => {
        console.log(user);
        if (user.signedIn) {
            navigation.navigate(ROUTES.SurveyResultsScreen);
        }
        else {
            navigation.navigate(ROUTES.EntranceScreen);
        }
    }
    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <View style={{ flex: 1, gap: 5, padding: 15, justifyContent: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                    <LoadingPieChart
                        timer={timer}
                        setTimer={setTimer}
                        state={state}
                        setState={setState}
                        getData={getData}
                    />
                </View>
                <View style={{ flex: 1, gap: 12 }}>
                    <FadeInFlatList
                        scrollEnabled={false}
                        initialDelay={500}
                        durationPerItem={1500}
                        data={[{ item: 'Calculated Macros' }, { item: 'Calculated BodyFat%' }, { item: 'Optimized Calender' }, { item: 'Plan Created' }]}
                        contentContainerStyle={{ gap: 10, alignSelf: 'center' }}
                        renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <FontAwesome6 name="circle-check" size={20} color="white" />
                                <Text style={{ color: 'white', fontSize: 24, alignSelf: 'center' }}>{item.item}</Text>
                            </View>
                        )}
                    />
                    <View>
                        {state.percent === 100 ? <NextQuestion title="Preview Plan And Details" goNext={handleNav} /> : <></>}
                    </View>

                </View>

            </View>


        </SafeAreaView>
    );
}
