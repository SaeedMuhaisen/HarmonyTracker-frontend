import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Image, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../../Styles/AppColors"
import { globalStyles } from "../../../GlobalStyles"
import { Picker } from 'react-native-wheel-pick'
import NextQuestion from "../../../Components/Buttons/NextQuestion"
import { useDispatch, useSelector } from "react-redux"

export default function ({ handleNextQuestion, comp }) {
    const dispatch = useDispatch();
    const intArray = Array.from({ length: 400 }, (_, index) => index + 15);
    const dArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <View key={comp.key} style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{flex:6,alignItems:'center',justifyContent:'center'}}>
                <Image source={comp.imgSource} resizeMode="center"/>
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...globalStyles.H4, borderBottomWidth: 1, borderBottomColor: 'white' }}>
                    {comp.state.unit === 'cm' ? <>{comp.state.first}.{comp.state.last}</> : <>{comp.state.first}' {comp.state.last}</>}
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
                        pickerData={intArray}
                        selectedValue={comp.state.first}
                        value={comp.state.first}
                        onValueChange={(value) => {
                            dispatch(comp.updateState({ first: value }));
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
                        pickerData={dArray}
                        selectedValue={comp.state.last}
                        value={comp.state.last}
                        onValueChange={(value) => {
                            dispatch(comp.updateState({ last: value }));
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
                    selectedValue={comp.state.unit}
                    onValueChange={value => {
                        dispatch(comp.updateState({ unit: value }))
                    }
                    }
                />
            </View>
        </View>
    );
}