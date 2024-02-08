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
import { updateGender } from "../../redux/userDetailsSlice"
import HeightQuestion from "./Questions/HeightQuestion"
{/**
Type 0 : single choice with no icon
Type 1: Multiple choice
type 6: date question
type 7: weight question
type 8: height question
*/}
const questionsArray = [
    {
        key: 4,
        type: 8,
        question: 'What is your Height?',
    },
    {
        key: 0,
        type: 0,
        question: 'Whats your Gender?',
        answers: [
            { name: 'Male', icon: 'male', iconProvider: 'Ionicons' },
            { name: 'Female', icon: 'female', iconProvider: 'Ionicons' }
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
        type: 7,
        question: 'What is your weight?',
    },



];
const extraBmiQuestions = [
    {
        key: 1,

    }
]

export default function Quiz() {    
    const [added,setAdded]=useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [textInputData, setTextInputData] = useState({});

    const handleAnswerSelection = (item) => {
        setSelectedAnswer(item);
        setPressedItem(item); // Add this line to update pressedItem state
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questionsArray.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedAnswer(null);
        } else {

            console.log('End of Quiz');
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedAnswer(null);
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
