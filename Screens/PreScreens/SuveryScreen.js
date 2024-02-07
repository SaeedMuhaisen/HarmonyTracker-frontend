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

{/**
Type 0 : single choice with no icon
Type 1: Multiple choice
type 6: date question
type 7: weight question

*/}
const questionsArray = [

    {
        key: 3,
        type: 7,
        question: 'What is your weight?',
    },
    {
        key: 0,
        type: 0,
        question: 'Whats your Gender?',
        answers: [
            { name: 'Male', icon: 'male', iconProvider: 'Ionicons' },
            { name: 'Female', icon: 'female', iconProvider: 'Ionicons' }
        ],
    },
    {
        key: 1,
        type: 0,
        question: 'Whats 1 + 1 ',
        answers: [
            { name: '2' },
            { name: '3' }
        ],
    },

    {
        key: 2,
        type: 6,
        question: 'When is your birthday?',
    },


];

export default function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [birthDay, setBirthDay] = useState(new Date());
    const [selectedWeight, setSelectedWeight] = useState('kg')
    const kgArray = Array.from({ length: 321 }, (_, index) => index + 30);
    const lbArray = Array.from({ length: 650 }, (_, index) => index + 70);
    // Create an object with values from 1 to 100
    const kgData = kgArray.map((value) => ({ label: `${value}`, value }));
    const lbData = lbArray.map((value) => ({ label: `${value}`, value }));
    const [userWeightInitial,setUserWeightInitial]=useState(70);
    const [userWeightFinal,setUserWeightFinal]=useState(0);
    const handleDate = (date) => {
        const timestamp = date.nativeEvent.timestamp;
        const selectedDate = new Date(timestamp);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1; // Month is zero-indexed, so add 1
        const day = selectedDate.getDate();
        const extractedDate = new Date(year, month - 1, day);
        setBirthDay(extractedDate);
    };

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
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
                        <MultipleQuestions answers={questionsArray[currentQuestionIndex].answers} handleAnswerSelection={handleAnswerSelection} pressedItem={pressedItem} />
                    </View>
                    <SafeAreaView style={{ paddingBottom: 5 }}>
                        <NextQuestion goNext={handleNextQuestion} />
                    </SafeAreaView>
                </View>

            );

        } else if (currentQuestion.type === 6) {
            return (

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'gray' }}>{monthNames[birthDay.getMonth()]} {birthDay.getDate()},{birthDay.getFullYear()}</Text>
                    </View>
                    <NextQuestion goNext={handleNextQuestion} noRadius={true} />
                    {
                        Platform.OS === 'ios' ?
                            <View style={{ padding: 0, marginLeft: 0, }}>
                                <DateTimePicker
                                    display={'spinner'}
                                    value={birthDay}
                                    dateFormat='day month year'
                                    onChange={handleDate}
                                    textColor='white'
                                    maximumDate={new Date('2020-01-01')}
                                />
                            </View>
                            :
                            <DatePicker
                                style={{ backgroundColor: 'transparent' }}
                                textColor='white'

                                minimumDate={new Date('1960-01-01')}
                                maximumDate={new Date('2020-01-01')}
                                onDateChange={(date) => {
                                    const timestamp = new Date(date).getTime(); // Convert date to timestamp
                                    const selectedDate = new Date(timestamp);
                                    const year = selectedDate.getFullYear();
                                    const month = selectedDate.getMonth() + 1; // Month is zero-indexed, so add 1
                                    const day = selectedDate.getDate();
                                    const extractedDate = new Date(year, month - 1, day);
                                    setBirthDay(extractedDate);

                                }}
                            />
                    }
                </View >
            );
        } else if (currentQuestion.type === 7) {
            return (

                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>{userWeightInitial}.{userWeightFinal} {selectedWeight}</Text>
                    </View>
                    <NextQuestion goNext={handleNextQuestion} noRadius={true} />
                    <View style={{ flexDirection: 'row' }}>
                        <Picker
                            style={{ flex: 2, backgroundColor: AppColors.stackBackground, }}
                            textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                            selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                            textSize={30}
                            isShowSelectBackground={false}
                            isShowSelectLine={false}
                            selectLineSize={9}
                            pickerData={selectedWeight === 'kg' ? kgArray : lbArray}
                            selectedValue={selectedWeight === 'kg' ? 70 : 150}
                            onValueChange={setUserWeightInitial}

                        />
                        <View style={{ justifyContent: 'center', }}>
                            <Text style={{ fontSize: 30, color: 'white', paddingBottom: 5 }}>.</Text>
                        </View>
                        <Picker
                            style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                            textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                            selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                            textSize={30}
                            isShowSelectBackground={false}
                            isShowSelectLine={false}
                            selectLineSize={9}
                            pickerData={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            selectedValue={0}
                            onValueChange={setUserWeightFinal}
                        />
                        <Picker
                            style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                            textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                            selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                            textSize={30}
                            isShowSelectBackground={false}
                            isShowSelectLine={false}
                            selectLineSize={9}
                            pickerData={['kg', 'lb']}
                            selectedValue='kg'
                            onValueChange={value => { setSelectedWeight(value); }}
                        />
                    </View>


                </View >
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
                                <View style={{ flex: 1 }}></View>

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