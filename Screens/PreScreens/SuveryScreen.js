import React, { useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../Styles/AppColors"
import Card from "../../Components/Cards/Card"
import AnswerCard from "../../Components/Cards/AnswerCard"
import { FlatList } from "react-native"
import CustomHeader from "../../Components/Bars/CustomHeader"
import Ionicons from '@expo/vector-icons/Ionicons'
import { globalStyles } from "../../GlobalStyles"
import { ProgressBar, Colors } from 'react-native-paper';
import { Picker } from 'react-native-wheel-pick'
import { DatePicker } from 'react-native-wheel-pick';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import NextQuestion from "../../Components/Buttons/NextQuestion"
import MultipleQuestions from "../../Components/MultipleQuestions"
import WeightQuestion from "./Questions/WeightQuestion"
import AgeQuestion from "./Questions/AgeQuestion"
import { updateExtraData, updateGender, updateWaistNarrowest, updateWaistNarrowestUnit } from "../../redux/userDetailsSlice"
import HeightQuestion from "./Questions/HeightQuestion"
import ExtraQuestions from "./Questions/ExtraQuestions"
import { useSelector, useStore } from "react-redux"
{/**
Type 0 : single choice with no update function
type 6: date question
type 7: weight question
type 8: height question

type 10:extra questions with picture and custom keyboard
*/}


export default function Quiz() {

    const questionsArray = [
        {
            key: 1,
            type: 10,
            question: 'Waist at Narrowest?',
            updateState: updateWaistNarrowest,
            updateUnit: updateWaistNarrowestUnit,
            state: useSelector(state => state.userDetails.waistNarrowest),
            unit: useSelector(state => state.userDetails.waistNarrowestUnit),
        },
        {
            key: 0,
            type: 0,
            question: 'Whats your Gender?',
            answers: [
                { name: 'Male', val: 'male', icon: 'male', iconProvider: 'Ionicons' },
                { name: 'Female', val: 'female', icon: 'female', iconProvider: 'Ionicons' }
            ],
            update: (val) => updateGender(val),

        },

        {
            key: 1,
            type: 0,
            question: 'Whats 1 + 1 ',
            answers: [
                { name: '2' },
                { name: '3' }
            ],
            update: (val) => updateGender(val),

        },

        {
            key: 2,
            type: 6,
            question: 'When is your birthday?',
        },
        {
            key: 3,
            type: 8,
            question: 'What is your Height?',
        },
        {
            key: 4,
            type: 7,
            question: 'What is your weight?',
        },
        {
            key: 5,
            type: 0,
            question: "Would you like to calculate your Body fat accurately with measure tape?",
            answers: [
                { name: "yes, lets do it!", val: true },
                { name: "I don't have a measure tape", val: false }
            ],
            update: (val) => updateExtraData(val),

        }
        , {
            key: 6,
            type: 0,
            question: 'a',
            answers: [
                { name: 'Male', val: 'a', icon: 'male', iconProvider: 'Ionicons' },
                { name: 'Female', val: 'b', icon: 'female', iconProvider: 'Ionicons' }
            ],
            update: (val) => updateGender(val),

        },
        {
            key: 7,
            type: 0,
            question: 'b',
            answers: [
                { name: 'Male', val: 'c', icon: 'male', iconProvider: 'Ionicons' },
                { name: 'Female', val: 'd', icon: 'female', iconProvider: 'Ionicons' }
            ],
            update: (val) => updateGender(val),

        },
        {
            key: 8,
            type: 0,
            question: 'finish',
            answers: [
                { name: 'Male', val: 'e', icon: 'male', iconProvider: 'Ionicons' },
                { name: 'Female', val: 'f', icon: 'female', iconProvider: 'Ionicons' }
            ],
            update: (val) => updateGender(val),

        }
    ]
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [textInputData, setTextInputData] = useState({});

    const handleAnswerSelection = (item) => {
        setSelectedAnswer(item);
        setPressedItem(item);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsArray.length - 1) {
            if (currentQuestionIndex === 5 && !store.getState().userDetails.extraData) {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
            }
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
        } else {

            console.log('End of Quiz');
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            if (currentQuestionIndex == 8 && !store.getState().userDetails.extraData) {
                setCurrentQuestionIndex(7 - 2);
                setSelectedAnswer(null);
            }
            else {
                setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
                setSelectedAnswer(null);
            }

        } else {

            console.log('End of Quiz');
        }
    };
    const [pressedItem, setPressedItem] = useState(null);

    const renderAnswers = () => {
        const currentQuestion = questionsArray[currentQuestionIndex];
        if (currentQuestion.type === 0) {
            return (

                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <MultipleQuestions answers={questionsArray[currentQuestionIndex].answers} updateState={questionsArray[currentQuestionIndex].update} handleAnswerSelection={handleAnswerSelection} update pressedItem={pressedItem} />
                    </View>
                    <SafeAreaView style={{ paddingBottom: 5 }}>
                        <NextQuestion goNext={handleNextQuestion} />
                    </SafeAreaView>
                </View>

            );

        } else if (currentQuestion.type === 6) {
            return (
                <AgeQuestion handleNextQuestion={handleNextQuestion} />

            );
        } else if (currentQuestion.type === 7) {
            return (
                <WeightQuestion
                    handleNextQuestion={handleNextQuestion}
                />

            );
        }
        else if (currentQuestion.type === 8) {
            return (
                <HeightQuestion handleNextQuestion={handleNextQuestion} />
            );
        }
        else if (currentQuestion.type === 10) {
            return (
                <ExtraQuestions handleNextQuestion={handleNextQuestion} comp={questionsArray[currentQuestionIndex]} temp={'waistNarrowestUnit'} />
            )
        }
    };

    const currentQuestion = questionsArray[currentQuestionIndex];
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <View style={{ flex: 1, backgroundColor: AppColors.stackBackground, justifyContent: 'flex-start' }} >

                    <View>
                        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }} >

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={{ flex: 1 }} onPress={handlePreviousQuestion}>
                                    <Ionicons name="chevron-back" size={30} color='white' />
                                </TouchableOpacity>
                                <View style={{ flex: 2 }}>
                                    <ProgressBar style={{ backgroundColor: AppColors.SecondaryYellow }} progress={currentQuestionIndex / 3} color={AppColors.primaryYellow} />
                                </View>
                                <View style={{ flex: 1 }}>

                                </View>

                            </View>
                        </SafeAreaView>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.H4 }}>{currentQuestion.question}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {renderAnswers()}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}
