import React, { useState, useEffect } from "react";
import { Text, Animated, KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import LoadingPieChart from "../../Components/LoadingPieChart";
import { Scale } from "victory-native";
import FadeInFlatList from "../../Components/ReAnimatedComps/FadeInFlatList";
import { FlatList } from "react-native-gesture-handler";
export default function () {
    const [timer, setTimer] = useState(1000);
    const getData = (percent) => {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    };
    const [state, setState] = useState({
        percent: 1,
        data: getData(0)
    });
    const [animation] = useState(new Animated.Value(0)); // Initial value for animation

    useEffect(() => {
        // Start animation when state.percent > 70
        if (state.percent > 70) {
            Animated.timing(animation, {
                toValue: 1, // Final value for animation
                duration: 1000, // Animation duration in milliseconds
                useNativeDriver: true, // Enable native driver for better performance
            }).start();
        }
    }, [state.percent]); // Run this effect whenever state.percent changes
    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>
            <View style={{ flex: 1, justifyContent: 'flex-start', gap: 5 }}>
                <View style={{ flex: 1 }}>
                    <LoadingPieChart
                        timer={timer}
                        setTimer={setTimer}
                        state={state}
                        setState={setState}
                        getData={getData}
                    />
                </View>
                <View style={{ flex: 1, }}>
                    <FadeInFlatList
                        data={[{ item: "Hello" }, { item: "Good Bye" }]}
                        renderItem={({ item }) => (
                            <Text style={{ fontSize: 10 }}>{item.item}</Text>
                        )}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}