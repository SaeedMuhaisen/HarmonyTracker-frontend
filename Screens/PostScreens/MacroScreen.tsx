import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, Animated, Button, Modal, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../GlobalStyles";
import { VictoryContainer, VictoryPie } from 'victory-native'
import { EvilIcons } from '@expo/vector-icons';


import Svg, { Circle } from 'react-native-svg';
import PieChart from "../../Components/PieChart";
import PieChartLarge from "../../Components/PieChartLarge";
import CalorieCard from "../../Components/Cards/MacroScreenCards/CalorieCard";
import { Swipeable, TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";
import Card from "../../Components/Cards/Card";
import { AppColors } from "../../Styles/AppColors"
import FoodItem from "../../Components/Cards/MacroScreenCards/FoodItem";

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
                style={{ color: 'white', fontWeight: 'bold' }}
                onPress={() => onDelete()}
            >
                Delete
            </Text>
        </Animated.View>
    );
};


export default function () {
    const [isModalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleTextInput = (text) => {
        // Handle your text input logic here
        console.log(text);
    };
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
    const textInputRef = useRef(null);

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }, []);

    return (
        <>
            <SafeAreaView style={{ flex: 1, gap: 10, backgroundColor: AppColors.stackBackground }}>
                <View style={{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 30, fontWeight: '800', color: AppColors.textColor }}>Today</Text>
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
                <View style={{ padding: 10, gap: 10 }}>
                    <Card>
                        <CalorieCard />
                    </Card>

                </View>
                <ScrollView style={{ flex: 1 }}>

                    <View style={{ padding: 10, gap: 5 }}>
                        <Swipeable
                            renderLeftActions={(progress, dragX) =>
                                renderLeftActions(progress, dragX, onDeleteItem)
                            }
                        >
                            <Card >
                                <FoodItem />
                            </Card>
                        </Swipeable>
                        <Card>
                            <FoodItem />
                        </Card>
                        <Card>
                            <FoodItem />
                        </Card>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={{ flex: 0.25, flexDirection: 'row', backgroundColor: 'yellow' }}
                    onPress={openModal}
                />

            </SafeAreaView >
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={{flex: 1}}
                    onPress={() => setModalVisible(false)} />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                        <View style={{ justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ height: 100, backgroundColor: 'blue' }}>

                                <TextInput
                                    autoFocus
                                    placeholder="Type something..."
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                

            </Modal>

        </>


    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple'
    },
    modal: {
        height: 100,
        flexDirection: 'row'
    },
});