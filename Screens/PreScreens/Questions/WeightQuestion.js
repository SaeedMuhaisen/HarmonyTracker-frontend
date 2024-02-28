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
import userDetailsSlice, { updateWeight, updatePreferredWeightUnit } from "../../../redux/userDetailsSlice"
import { convertKgtoLb, convertLbtoKg } from "../../../utils/converters"
export default function ({ handleNextQuestion }) {
    const dispatch = useDispatch();
    const CONVERSION_FACTOR = 1.0;
    const preferredWeightUnit = useSelector(state => state.userDetails.preferredWeightUnit)
    
    const weight = useSelector(state => state.userDetails.weight);
    const [initial, setInitial] = useState(preferredWeightUnit === 'kg' ? Math.floor(weight) : Math.floor(convertKgtoLb((weight))));
    const [final, setFinal] = useState(preferredWeightUnit === 'kg'
        ? 10 * (weight - Math.floor(weight)).toFixed(1)
        : 10 * (convertKgtoLb(weight) - Math.floor(convertKgtoLb(weight))).toFixed(1)
    );
    useEffect(() => {
        const updateState = (value) => {
            dispatch(updateWeight(value));
        };
        const calculateAndUpdateState = () => {
            const newValue = preferredWeightUnit === 'kg'
                ? initial * CONVERSION_FACTOR + final / 10
                : convertLbtoKg(initial * CONVERSION_FACTOR + final / 10);
            updateState(newValue);
        };
        calculateAndUpdateState();
    }, [initial, final, preferredWeightUnit]);

    useEffect(() => {
        console.log('state weight:',weight)
    }, [weight])

    const kgArray = Array.from({ length: 321 }, (_, index) => index + 30);
    const lbArray = Array.from({ length: 650 }, (_, index) => index + 70);
    return (
        <View key={1} style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...globalStyles.title, borderBottomWidth: 1, borderBottomColor: 'white' }}>{initial}.{final} {preferredWeightUnit}</Text>
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
                    pickerData={preferredWeightUnit === 'kg' ? kgArray : lbArray}
                    selectedValue={initial}
                    onValueChange={value => setInitial(value)}
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
                    selectedValue={final}
                    onValueChange={value => setFinal(value)}
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
                    selectedValue={preferredWeightUnit}
                    onValueChange={value => dispatch(updatePreferredWeightUnit(value))}
                />
            </View>
        </View>
    );
}