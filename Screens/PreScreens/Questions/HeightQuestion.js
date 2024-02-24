import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../../Styles/AppColors"
import { FlatList } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons'
import { globalStyles } from "../../../GlobalStyles"
import { ProgressBar, Colors } from 'react-native-paper';
import { Picker } from 'react-native-wheel-pick'
import { DatePicker } from 'react-native-wheel-pick';
import NextQuestion from "../../../Components/Buttons/NextQuestion"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import store from "../../../redux/store"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import userDetailsSlice, { updateHeight, updateHeightF, updateHeightI, updateHeightUnit, updatePreferedUnit, updateWeightF, updateWeightI, updateWeightUnit } from "../../../redux/userDetailsSlice"
import { convertCmToInches, convertCmtoFt, convertFtToCm, convertInchesToCm } from "../../../utils/converters"
export default function ({ handleNextQuestion }) {

    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();
    const [initial, setInitial] = useState(5);
    const [final, setFinal] = useState(7);
    const cmArray = Array.from({ length: 210 }, (_, index) => index + 110);
    const inch1Array = [4, 5, 6, 7, 8,];
    const inch2Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

    useEffect(() => {
        const updateState = (value) => {
            dispatch(updateHeight(value));
        };
        const calculateAndUpdateState = () => {
            if (userDetails.preferedUnit === 'inch') {
                const newValue = Math.round(convertFtToCm(initial)+convertInchesToCm(final));
                
                updateState(newValue);
            }
        };
        calculateAndUpdateState();
    }, [initial, final]);

    useEffect(() => {
        console.log('state height:', userDetails.height)
    }, [userDetails.height])
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                {userDetails.preferedUnit === 'cm' ?
                    <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                        {userDetails.height} {userDetails.preferedUnit}
                    </Text>
                    : <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                        {initial}" {final}' {userDetails.preferedUnit}es
                    </Text>
                }

            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} disabled={false} />
            <View style={{ flexDirection: 'row' }}>
                {
                    userDetails.preferedUnit === 'cm' ?
                        <View style={{ flex: 3 }}>
                            <Picker
                                key={1}
                                style={{ backgroundColor: AppColors.stackBackground, }}
                                textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                                textSize={30}
                                isShowSelectBackground={false}
                                isShowSelectLine={false}
                                selectLineSize={9}
                                pickerData={cmArray}
                                selectedValue={userDetails.height}
                                onValueChange={value => dispatch(updateHeight(value))}
                            />
                        </View>
                        :
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <Picker
                                style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                                textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                                textSize={30}
                                isShowSelectBackground={false}
                                isShowSelectLine={false}
                                selectLineSize={9}
                                pickerData={inch1Array}
                                selectedValue={initial}
                                onValueChange={value => setInitial(value)}
                            />
                            <Picker
                                style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                                textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                                textSize={30}
                                isShowSelectBackground={false}
                                isShowSelectLine={false}
                                selectLineSize={9}
                                pickerData={inch2Array}
                                selectedValue={final}
                                onValueChange={value => setFinal(value)}
                            />
                        </View>


                }
                <Picker
                    style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                    textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                    selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                    textSize={30}
                    isShowSelectBackground={false}
                    isShowSelectLine={false}
                    selectLineSize={9}
                    pickerData={['cm', 'inch']}
                    selectedValue={userDetails.preferedUnit}
                    onValueChange={value => {
                        dispatch(updatePreferedUnit(value))
                    }
                    }
                />
            </View>
        </View>
    );
}