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
import userDetailsSlice, { updateWeightF, updateWeightI, updateWeightUnit } from "../../../redux/userDetailsSlice"
export default function ({ handleNextQuestion }) {
    
    const userDetails = useSelector(state => state.userDetails);
    const dispatch = useDispatch();
    
    const kgArray = Array.from({ length: 321 }, (_, index) => index + 30);
    const lbArray = Array.from({ length: 650 }, (_, index) => index + 70);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>{userDetails.weightI}.{userDetails.weightF} {userDetails.weightUnit}</Text>
            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} />
            <View style={{ flexDirection: 'row' }}>
                <Picker
                    key={1}
                    style={{ flex: 2, backgroundColor: AppColors.stackBackground, }}
                    textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                    selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                    textSize={30}
                    isShowSelectBackground={false}
                    isShowSelectLine={false}
                    selectLineSize={9}
                    pickerData={userDetails.weightUnit === 'kg' ? kgArray : lbArray}
                    selectedValue={userDetails.weightI}
                    onValueChange={value => dispatch(updateWeightI({weightI:value}))}
                />
                <View style={{ justifyContent: 'center', }}>
                    <Text style={{ fontSize: 30, color: 'white', paddingBottom: 5 }}>.</Text>
                </View>
                <Picker
                    key={2}
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
                    key={3}
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
                />
            </View>
        </View>
    );
}