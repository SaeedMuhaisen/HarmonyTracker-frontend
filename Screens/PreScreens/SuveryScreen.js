import React, { useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity } from "react-native"
import { AppColors } from "../../Styles/AppColors"
import Card from "../../Components/Cards/Card"
import AnswerCard from "../../Components/Cards/AnswerCard"
import { FlatList } from "react-native"
import CustomHeader from "../../Components/Bars/CustomHeader"
import Ionicons from '@expo/vector-icons/Ionicons'
import { globalStyles } from "../../GlobalStyles"
import { ProgressBar, Colors } from 'react-native-paper';
const questionsArray = [
    {
        key: 0,
        question: 'Whats your Gender?',
        answers: ['Male', 'Female'],
        type: 0,
        

    },
    {
        key: 1,
        question: 'Whats your Weight',
        type: 1,
        
    },
    {
        key: 2,
        question: 'How tall are you?',
        type: 1,
        
    },

    // Add more questions as needed
];

export default function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [textInputData, setTextInputData] = useState({});

    const handleAnswerSelection = (item) => {
        setSelectedAnswer(item);
        setPressedItem(item); // Add this line to update pressedItem state
    };
    const handleTextChange = (text) => {
        setTextInputData((prevData) => ({
            ...prevData,
            [questionsArray[currentQuestionIndex].key]: text,
        }));
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
                <FlatList
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingTop: 30, justifyContent: 'center', gap: 10 }}
                    data={currentQuestion.answers}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <TouchableWithoutFeedback

                            onPress={() => handleAnswerSelection(item)}
                        >
                            <View style={{
                                backgroundColor: pressedItem === item ? AppColors.primaryYellow : AppColors.cardBackground,
                                padding: 15,
                                gap: 5,
                                borderRadius: 7,
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 3,
                                },
                                shadowOpacity: 0.27,
                                shadowRadius: 4.65,
                                elevation: 6,
                            }}>
                                <Text style={{ color: pressedItem === item ? 'black' : 'white', fontWeight: '700' }}>{item}</Text>
                            </View>

                        </TouchableWithoutFeedback>
                    )}
                />
            );
        } else if (currentQuestion.type === 1) {
            return (
                <TextInput
                    placeholder="Type your answer here"
                    value={textInputData[currentQuestion.key] || ''}
                    onChangeText={handleTextChange}
                />
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
                <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>

                    <View style={{ flex: 1, justifyContent: 'flex-start', gap: 5, padding: 10 }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <TouchableOpacity style={{ flex: 1 }} onPress={handlePreviousQuestion}>
                                <Ionicons name="chevron-back" size={30} color='white' />
                            </TouchableOpacity>
                            <View style={{ flex: 2}}>
                                <ProgressBar style={{ backgroundColor: AppColors.SecondaryYellow }} progress={currentQuestionIndex/3} color={AppColors.primaryYellow} />
                            </View>
                            <View style={{ flex: 1 }}></View>
                        </View>
                        <View style={{}}>
                            <Text style={{ ...globalStyles.H4, alignSelf: 'flex:start' }}>{currentQuestion.question}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {renderAnswers()}
                        </View>
                
                        <TouchableWithoutFeedback onPress={handleNextQuestion}>
                            <View style={{ ...globalStyles.card }}>
                                <Text style={{ color: 'white', fontWeight: '700' }}>Continue</Text>
                            </View>
                        </TouchableWithoutFeedback>

                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
