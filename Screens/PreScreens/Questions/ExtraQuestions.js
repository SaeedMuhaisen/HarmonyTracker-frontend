import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../../Styles/AppColors"
import { globalStyles } from "../../../GlobalStyles"
import { Picker } from 'react-native-wheel-pick'
import NextQuestion from "../../../Components/Buttons/NextQuestion"

import { useDispatch, useSelector } from "react-redux"

export default function ({ handleNextQuestion, comp, temp }) {
    const dispatch = useDispatch();

    const cmArray1 = Array.from({ length: 1000 }, (_, index) => index + 15);
    const cmArray2 = Array.from({ length: 10 }, (_, index) => index + 0);
    const inch1Array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const inch2Array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                    {Math.floor(comp.state)}.{Math.round(10*(comp.state-Math.floor(comp.state)))}
                </Text>
            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} />
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <Picker
                        style={{ flex: 1, backgroundColor: AppColors.stackBackground }}
                        textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                        selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                        textSize={30}
                        isShowSelectBackground={false}
                        isShowSelectLine={false}
                        selectLineSize={9}
                        pickerData={comp.unit === 'cm' ? cmArray1 : inch1Array}
                        selectedValue={Math.floor(comp.state)} // Display integer part
                        onValueChange={(value) => {
                            // Calculate the new integer part
                            const newIntegerPart = parseInt(value, 10);
                            // Calculate the new state value
                            const newState = newIntegerPart + (comp.state % 1);
                            // Update the state
                            dispatch(comp.updateState(newState));
                        }}
                    />

                    <Picker
                        style={{ flex: 1, backgroundColor: AppColors.stackBackground }}
                        textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                        selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                        textSize={30}
                        isShowSelectBackground={false}
                        isShowSelectLine={false}
                        selectLineSize={9}
                        pickerData={comp.unit === 'cm' ? cmArray2 : inch2Array}
                        selectedValue={(comp.state -Math.floor(comp.state)) * 10} 
                        onValueChange={(value) => {
                        
                            newState  = (value/10)+Math.floor(comp.state) ;
                            console.log(newState)
                            dispatch(comp.updateState(newState));
                        }}
                    />
                </View>

                <Picker
                    style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                    textColor={Platform.OS === 'android' ? 'gray' : 'white'}
                    selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'white'}
                    textSize={30}
                    isShowSelectBackground={false}
                    isShowSelectLine={false}
                    selectLineSize={9}
                    pickerData={['cm', 'inch']}
                    selectedValue={comp.unit}
                    onValueChange={value => {
                        dispatch(comp.updateUnit(value))

                    }
                    }
                />
            </View>
        </View>
    );
}