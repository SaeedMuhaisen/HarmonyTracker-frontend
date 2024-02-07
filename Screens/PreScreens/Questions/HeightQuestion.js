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
import userDetailsSlice, { updateHeight, updateHeightF, updateHeightI, updateHeightUnit, updateWeightF, updateWeightI, updateWeightUnit } from "../../../redux/userDetailsSlice"
export default function ({ handleNextQuestion }) {

    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();

    const cmArray = Array.from({ length: 210 }, (_, index) => index + 110);
    const inch1Array = [4, 5, 6, 7, 8,];
    const inch2Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                {userDetails.heightUnit === 'cm' ?
                    <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                        {userDetails.height} {userDetails.heightUnit}
                    </Text>
                    : <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                        {userDetails.heightI}"{userDetails.heightF}'{userDetails.heightUnit}
                    </Text>

                }

            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} />
            <View style={{ flexDirection: 'row' }}>
                {
                    userDetails.heightUnit === 'cm' ?
                        <View style={{ flex: 3 }}>
                            <Picker
                                key={1} //issue with rendering over the following picker in inches, i have no idea why though
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
                                selectedValue={userDetails.heightI}
                                onValueChange={value => dispatch(updateHeightI(value))}
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
                                selectedValue={userDetails.heightF}
                                onValueChange={value => dispatch(updateHeightF(value))}
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
                    selectedValue={userDetails.heightUnit}
                    onValueChange={value => {
                        dispatch(updateHeightUnit(value))
                    }
                    }
                />
                {/* 
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
                    selectedValue={userDetails.weightF}
                    onValueChange={value => dispatch(updateWeightF({weightF:value}))}
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
                    selectedValue={userDetails.weightUnit}
                    onValueChange={value => dispatch(updateWeightUnit({weightUnit:value}))}
                /> */}
            </View>
        </View>
    );
}