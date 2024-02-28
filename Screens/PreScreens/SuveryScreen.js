import React, { useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../Styles/AppColors"
import Ionicons from '@expo/vector-icons/Ionicons'
import { globalStyles } from "../../GlobalStyles"
import { ProgressBar, Colors } from 'react-native-paper';
import NextQuestion from "../../Components/Buttons/NextQuestion"
import MultipleQuestions from "../../Components/MultipleQuestions"
import WeightQuestion from "./Questions/WeightQuestion"
import AgeQuestion from "./Questions/AgeQuestion"
import { updateActivityLevel, updateBicepsWidest, updateExtraData, updateForearmWidest, updateGender, updateHipWidest, updateNeckNarrowest, updateThighWidest, updateWaistNarrowest, updateWaistNarrowestUnit, updateWaistNavel, updateWristNarrowest } from "../../redux/userDetailsSlice"
import HeightQuestion from "./Questions/HeightQuestion"
import ExtraQuestions from "./Questions/ExtraQuestions"
import { useSelector, useStore } from "react-redux"
import store from "../../redux/store"
import body from "../../assets/body.png"
import { useNavigation } from "@react-navigation/native"
import ROUTES from "../../Navigation/ROUTES"
{/**
Type 0 : single choice with no update function
type 6: date question
type 7: weight question
type 8: height question

type 10:extra questions with picture and custom keyboard
*/}


export default function Quiz() {
    const navigation = useNavigation();
    const questionsArray = [

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
            type: 6,
            question: 'When is your birthday?',
        },
        {
            key: 2,
            type: 8,
            question: 'What is your Height?',
        },
        {
            key: 3,
            type: 7,
            question: 'What is your weight?',
        },
        {
            key: 4,
            type: 0,
            question: "Do you have a measure tape?",
            answers: [
                { name: "yes, lets do it!", val: true },
                { name: "I don't have a measure tape", val: false }
            ],
            update: (val) => updateExtraData(val),

        }
        ,
        {
            key: 5,
            type: 10,
            question: 'Waist at Narrowest point?',
            updateState: updateWaistNarrowest,
            state: useSelector(state => state.userDetails.waistNarrowest),
            imgSource: body,
        },
        {
            key: 6,
            type: 10,
            question: 'Waist at navel?',
            updateState: updateWaistNavel,
            state: useSelector(state => state.userDetails.waistNavel),
            imgSource: body,
        },
        {
            key: 7,
            type: 10,
            question: 'Hip at widest point',
            updateState: updateHipWidest,
            state: useSelector(state => state.userDetails.hipWidest),
            imgSource: body,
        },
        {
            key: 8,
            type: 10,
            question: 'Thigh at widest point?',
            updateState: updateThighWidest,
            state: useSelector(state => state.userDetails.thighWidest),
            imgSource: body,
        },
        {
            key: 9,
            type: 10,
            question: 'Neck at Narrowest point?',
            updateState: updateNeckNarrowest,
            state: useSelector(state => state.userDetails.neckNarrowest),
            imgSource: body,
        },
        {
            key: 10,
            type: 10,
            question: 'biceps at widest point?',
            updateState: updateBicepsWidest,
            state: useSelector(state => state.userDetails.bicepsWidest),
            imgSource: body,
        },
        {
            key: 11,
            type: 10,
            question: 'forearm at widest point?',
            updateState: updateForearmWidest,
            state: useSelector(state => state.userDetails.forearmWidest),
            imgSource: body,
        },
        {
            key: 12,
            type: 10,
            question: 'wrist at narrowest point?',
            updateState: updateWristNarrowest,
            state: useSelector(state => state.userDetails.wristNarrowest),
            imgSource: body,
        },
        {
            key: 13,
            type: 0,
            question: 'Whats your activity level? Do you workout?',
            answers: [
                { name: 'Not at all, i am mostly setting on my desk', val:1.2, icon: 'male', iconProvider: 'Ionicons' },
                { name: 'I do light activity, like walking', val: 1.375, icon: 'female', iconProvider: 'Ionicons' } ,               
                { name: 'I workout somedays of the week', val: 1.55, icon: 'female', iconProvider: 'Ionicons' },
                { name: 'I am actually quite active', val: 1.725, icon: 'female', iconProvider: 'Ionicons' },
                { name: 'I am extremely active', val: 1.9, icon: 'female', iconProvider: 'Ionicons' },
            ],
            update: (val) => updateActivityLevel(val),

        },
    ]
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [textInputData, setTextInputData] = useState({});
    const [pressedItem, setPressedItem] = useState(null);

    const handleAnswerSelection = (item) => {
        setSelectedAnswer(item);
        setPressedItem(item);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsArray.length - 1) {
            if (currentQuestionIndex === 4 && !store.getState().userDetails.extraData) {
                setCurrentQuestionIndex(13)
                setSelectedAnswer(null);
            }
            else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setSelectedAnswer(null);
            }

        } else {
            navigation.navigate(ROUTES.SurveyEndScreen)
        }
    };
    const handlePreviousQuestion = () => {

        if (currentQuestionIndex > 0) {
            if (currentQuestionIndex === 13 && !store.getState().userDetails.extraData) {
                setCurrentQuestionIndex(4);
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

    const renderAnswers = () => {
        const currentQuestion = questionsArray[currentQuestionIndex];
        if (currentQuestion.type === 0) {
            return (
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                    <View style={{ flex: 1 }}>
                        <MultipleQuestions element={questionsArray[currentQuestionIndex]} handleAnswerSelection={handleAnswerSelection} update pressedItem={pressedItem} />
                    </View>
                    <SafeAreaView style={{ paddingBottom: 5 }}>
                        <NextQuestion goNext={handleNextQuestion} disabled={selectedAnswer === null ? true : false} />
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
                <View  style={{flex:1,}} key={currentQuestion.key}>
                    <ExtraQuestions handleNextQuestion={handleNextQuestion} comp={questionsArray[currentQuestionIndex]} state={currentQuestion.state}/>
                </View>
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
                                    <ProgressBar style={{ backgroundColor: AppColors.SecondaryYellow }} progress={currentQuestionIndex / 14} color={AppColors.primaryYellow} />
                                </View>
                                <View style={{ flex: 1 }}>

                                </View>

                            </View>
                        </SafeAreaView>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
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
