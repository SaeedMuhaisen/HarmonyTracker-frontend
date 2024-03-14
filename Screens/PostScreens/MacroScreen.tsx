import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Animated, Button, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../GlobalStyles";
import { VictoryContainer, VictoryPie } from 'victory-native'
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import Svg, { Circle } from 'react-native-svg';
import PieChart from "../../Components/PieChart";
import PieChartLarge from "../../Components/PieChartLarge";
import CalorieCard from "../../Components/Cards/MacroScreenCards/CalorieCard";
import { Swipeable, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";
import Card from "../../Components/Cards/Card";
import { AppColors } from "../../Styles/AppColors"
import FoodItem from "../../Components/Cards/MacroScreenCards/FoodItem";
import AddMealModal from "../../Components/Modals/AddMealModal";
import { useSelector } from "react-redux";
import UserMacrosPie from "../../Components/Cards/ResultScreenCards/UserMacrosPie";
import DailyMacroCard from "../../Components/Cards/MacroScreenCards/DailyMacroCard";
import SingleMacro from "../../Components/Cards/ResultScreenCards/SingleMacro";

const renderLeftActions = (progress, dragX, onDelete) => {
    const trans = dragX.interpolate({
        inputRange: [0, 100], // Change 100 to the width of your swipeable content
        outputRange: [0, 1],
    });

    return (
        <Animated.View
            style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 15,
                transform: [{ translateX: trans }],
            }}
        >
            <Text
                style={{ color:AppColors.textColor, fontWeight: 'bold' }}
                onPress={() => onDelete()}
            >
                Delete
            </Text>
        </Animated.View>
    );
};


export default function () {
    const macros = useSelector((state: any) => state.macros)
    const dailyIntake = useSelector((state: any) => state.dailyIntake)
    const [isModalVisible, setModalVisible] = useState(false);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };

    const textInputRef = useRef(null);
    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);
    const getCurrentDate = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const d = new Date();
        const day = new Date().getDay();
        return (monthNames[d.getMonth()] + ' ' + day);

    }
    const onDeleteItem = () => {
        // Implement your logic to delete the item
        console.log('Item deleted');
    };



    return (
        <>
            <SafeAreaView style={{ flex: 1, gap: 10, backgroundColor: AppColors.stackBackground }}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={globalStyles.title}>Today</Text>
                        <Text style={{ fontSize: 12, fontWeight: '500', color: AppColors.textColor }}>{' ' + getCurrentDate()}</Text>
                    </View>
                    <TouchableWithoutFeedback >
                        <EvilIcons name="calendar" size={35} color={AppColors.textColor} />
                    </TouchableWithoutFeedback>
                </View>

                <View style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                }} />

                <View style={{ flex: 1, gap: 20, padding: 15 }}>

                    <View style={{ ...globalStyles.showdedCard, flexDirection: 'row' }}>
                        <View style={{ flex: 1, }}>
                            <DailyMacroCard
                            />
                        </View>

                        <View style={{ width: '20%', justifyContent: 'space-between' }}>
                            <View style={{}}>
                                <SingleMacro
                                    title={'Protein'}
                                    color={AppColors.proteinColor}
                                    value={macros.protein}
                                    percentage={'70'}
                                    withPercentage={false}
                                    used={dailyIntake.protein}
                                />
                            </View>
                            <View style={{}}>
                                <SingleMacro
                                    title={'Carbs'}
                                    color={AppColors.carbsColor}
                                    value={macros.carbs}
                                    percentage={'5'}
                                    withPercentage={false}
                                    used={dailyIntake.carbs}
                                />
                            </View>
                            <View style={{}}>
                                <SingleMacro
                                    title={'Fat'}
                                    color={AppColors.fatColor}
                                    value={macros.fat}
                                    percentage={'25'}
                                    withPercentage={false}
                                    used={dailyIntake.fat}
                                />
                            </View>
                        </View>
                    </View>


                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ gap: 5 }}>
                            <Swipeable
                                renderLeftActions={(progress, dragX) =>
                                    renderLeftActions(progress, dragX, onDeleteItem)
                                }
                            >
                                <Card >
                                    <FoodItem />
                                </Card>
                            </Swipeable>
                        </View>
                    </ScrollView>
                </View>

                <View>
                    <View style={{
                        position: 'absolute',
                        bottom: 55,
                        right: 5,
                        height: 50,
                        width: 50
                    }}>
                        <TouchableOpacity style={{
                            flex: 1,
                            borderRadius: 1000,
                        }}
                            onPress={openModal} >
                            <AntDesign name="pluscircle" size={45} color={AppColors.primaryYellow} />
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView >

            <AddMealModal closeModal={closeModal} isModalVisible={isModalVisible} />

        </>


    )
}
