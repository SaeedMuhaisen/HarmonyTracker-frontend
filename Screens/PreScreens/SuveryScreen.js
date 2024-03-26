import React, { useState } from "react"
import { View, Text,} from "react-native"
import { AppColors } from "../../Styles/AppColors"
import { globalStyles } from "../../GlobalStyles"
import NextQuestion from "../../Components/Buttons/NextQuestion"
import MultipleQuestions from "../../Components/MultipleQuestions"
import WeightQuestion from "./Questions/WeightQuestion"
import AgeQuestion from "./Questions/AgeQuestion"
import { updateActivityLevel, updateExtraData, updateGender, updateGoal, updateHipWidest, updateNeckNarrowest,updateWaistNavel, } from "../../redux/bodyDetailsSlice"
import HeightQuestion from "./Questions/HeightQuestion"
import ExtraQuestions from "./Questions/ExtraQuestions"
import { useSelector, useStore } from "react-redux"
import store from "../../redux/store"
import male_waist from "../../assets/Measurements/male_waist.png"
import male_neck from "../../assets/Measurements/male_neck.png"
import female_waist from "../../assets/Measurements/female_waist.png"
import female_neck from "../../assets/Measurements/female_neck.png"
import female_hip from "../../assets/Measurements/female_hip.png"
import { useNavigation } from "@react-navigation/native"
import ROUTES from "../../Navigation/ROUTES"
import OuterContainer from "../../Components/Views/OuterContainer"
import TopBar from "../../Components/SurveyComponents/TopBar"
import ScrollQuestion from "../../Components/SurveyComponents/ScrollQuestion"
import constricted_activity from '../../assets/activityLevels/constricted_activity.png'
import extremelyActive_activity from '../../assets/activityLevels/extremelyActive_activity.png'
import home_activity from '../../assets/activityLevels/home_activity.png'
import lightlyActive_activity from '../../assets/activityLevels/lightlyActive_activity.png'
import moderatelyActive_activity from '../../assets/activityLevels/moderatelyActive_activity.png'
import sedentary_activity from '../../assets/activityLevels/sedentary_activity.png'
import slightlyActive_activity from '../../assets/activityLevels/slightlyActive_activity.png'
import veryActive_activity from '../../assets/activityLevels/veryActive_activity.png'
{/**
Type 0 : single choice with no update function
type 6: date question
type 7: weight question
type 8: height question

type 10:extra questions with picture and custom keyboard
*/}


export default function Quiz() {
    const navigation = useNavigation();
    const bodyDetails = useSelector(state => state.bodyDetails)
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
            question: 'Neck at Narrowest point?',
            updateState: updateNeckNarrowest,
            state: useSelector(state => state.bodyDetails.neckNarrowest),
            imgSourceMale:male_neck,
            imgSourceFemale:female_neck,
        },
        {
            key: 6,
            type: 10,
            question: 'Waist at navel?',
            updateState: updateWaistNavel,
            state: useSelector(state => state.bodyDetails.waistNavel),
            imgSourceMale:male_waist ,
            imgSourceFemale: female_waist,
        },
        {
            key: 7,
            type: 10,
            question: 'Hip at widest point',
            updateState: updateHipWidest,
            state: useSelector(state => state.bodyDetails.hipWidest),
            imgSourceMale: null,
            imgSourceFemale: female_hip,
        },

        {
            key: 8,
            type: 1,
            question: <Text style={{ ...globalStyles.body, fontSize: 20 }}>How <Text style={{ ...globalStyles.description, fontSize: 20 }}>active</Text> are you?</Text>,
            answers: [
                { title: 'Constricted', name: 'Movement is Limited to a Confined Space, Almost Always Sitting or Laying', val: 1.1, icon: 'male', iconProvider: 'Ionicons' },
                { title: 'Working From Home', name: 'Little to No Travel, No Exercise, Some Walking, Mostly Sitting or Laying ', val: 1.16, icon: 'female', iconProvider: 'Ionicons', },
                { title: 'Sedentary', name: 'Little or No Exercise, Moderate Walking, Desk Job (Away from Home) ', val: 1.2, icon: 'female', iconProvider: 'Ionicons', },

                { title: 'Slightly Active', name: 'Exercise or Light Sports 1 to 3 Days a Week, Light Jogging or Walking 3 to 4 Days a Week', val: 1.375, icon: 'female', iconProvider: 'Ionicons' },

                { title: 'Lightly Active', name: 'Exercise or Moderate Sports 2 to 3 Days a Week, Light Jogging or Walking 5 to 7 Days a Week', val: 1.425, icon: 'female', iconProvider: 'Ionicons' },

                { title: 'Moderately Active', name: 'Physical Work, Exercise, or Sports 4 to 5 Days a Week, Construction Laborer', val: 1.55, icon: 'female', iconProvider: 'Ionicons' },
                { title: 'Very Active', name: 'Heavy Physical Work, Exercise, or Sports 6 to 7 Days a Week, Hard Laborer', val: 1.75, icon: 'female', iconProvider: 'Ionicons' },
                { title: 'Extremely Active', name: 'Very Heavy Physical Work or Exercise Every Day, Professional/Olympic Athlete', val: 1.9, icon: 'female', iconProvider: 'Ionicons' },
            ],
            pictures: [
                constricted_activity,
                home_activity,
                sedentary_activity,
                slightlyActive_activity,
                lightlyActive_activity,
                moderatelyActive_activity,
                veryActive_activity,
                extremelyActive_activity,
            ],

            update: (val) => updateActivityLevel(val),
        },
        {
            key: 9,
            type: 0,
            question: 'What is your goal?',
            answers: [
                { name: 'Lose Weight', val: 0 },
                { name: 'Maintain My Weight', val: 1 },
                { name: 'Gain Weight and Muscels', val: 2 },
            ],
            update: (val) => updateGoal(val),
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
        console.log(currentQuestionIndex)
        if (currentQuestionIndex < questionsArray.length - 1) {
            if (currentQuestionIndex === 6) {
                console.log(bodyDetails.gender)
                if (bodyDetails.gender === 'male') {
                    console.log('+2')
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
                    setSelectedAnswer(null);
                } else {
                    console.log('+1')
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                    setSelectedAnswer(null);
                }
            }
            else {
                if (currentQuestionIndex === 4 && !store.getState().bodyDetails.extraData) {
                    setCurrentQuestionIndex(8)
                    setSelectedAnswer(null);
                }
                else {
                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                    setSelectedAnswer(null);
                }
            }

        } else {
            navigation.navigate(ROUTES.SurveyEndScreen)
        }
    };
    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            if (currentQuestionIndex === 8) {
                if (bodyDetails.extraData) {
                    if (bodyDetails.gender === 'male') {
                        console.log('-2')
                        setCurrentQuestionIndex((prevIndex) => prevIndex - 2);
                        setSelectedAnswer(null);
                    } else {
                        console.log('-1')
                        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
                        setSelectedAnswer(null);
                    }
                }
                else {
                    setCurrentQuestionIndex(4);
                    setSelectedAnswer(null);
                }
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
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 5, }}>
                        <View>
                            <MultipleQuestions element={questionsArray[currentQuestionIndex]} handleAnswerSelection={handleAnswerSelection} update pressedItem={pressedItem} />
                        </View>
                        <View style={{ paddingHorizontal: 10, }}>
                            <NextQuestion goNext={handleNextQuestion} disabled={selectedAnswer === null ? true : false} />
                        </View>
                    </View>
                </View>
            );

        } else if (currentQuestion.type === 6) {
            return (
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
                        </View>
                        <AgeQuestion handleNextQuestion={handleNextQuestion} />
                    </View>
                </View>
            );
        } else if (currentQuestion.type === 7) {
            return (
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
                        </View>
                        <WeightQuestion
                            handleNextQuestion={handleNextQuestion}
                        />
                    </View>
                </View>

            );
        }
        else if (currentQuestion.type === 8) {
            return (
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
                        </View>
                        <HeightQuestion handleNextQuestion={handleNextQuestion} />
                    </View>
                </View>

            );
        }
        else if (currentQuestion.type === 10) {
            return (
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                        <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ ...globalStyles.title }}>{currentQuestion.question}</Text>
                        </View>
                        <View style={{ flex: 1, }} key={currentQuestion.key}>
                            <ExtraQuestions handleNextQuestion={handleNextQuestion} comp={questionsArray[currentQuestionIndex]} state={currentQuestion.state} />
                        </View>
                    </View>
                </View>

            )
        }
        else if (currentQuestion.type === 1) {
            return (
                <View style={{ flex: 1, justifyContent: 'flex-start', }}>
                    <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                        {currentQuestion.question}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between', paddingBottom: 5, }}>
                        <ScrollQuestion element={questionsArray[currentQuestionIndex]} handleAnswerSelection={handleAnswerSelection} update pressedItem={pressedItem} />
                        <View style={{ paddingHorizontal: 10, }}>
                            <NextQuestion goNext={handleNextQuestion} disabled={selectedAnswer === null ? true : false} />
                        </View>
                    </View>
                </View>
            )
        }
    };
    const currentQuestion = questionsArray[currentQuestionIndex];
    return (
        <OuterContainer>
            <View style={{ flex: 1, backgroundColor: AppColors.stackBackground, justifyContent: 'flex-start' }} >
                <TopBar progress={currentQuestionIndex / 14} btnFunc={handlePreviousQuestion} />
                {renderAnswers()}
            </View>
        </OuterContainer >
    )
}
