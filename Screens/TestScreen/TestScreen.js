import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../Styles/AppColors';
import { PanResponder } from 'react-native';
import { Picker } from 'react-native-wheel-pick'
import { DatePicker } from 'react-native-wheel-pick';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerAndroid from '@react-native-community/datetimepicker';
export default function () {

    const [selectedWeight, setSelectedWeight] = useState()
    const numbersArray = Array.from({ length: 300 }, (_, index) => index + 20);
    const secondNumbersArray = Array.from({ length: 300 }, (_, index) => index + 500);
    // Create an object with values from 1 to 100
    const pickerData = numbersArray.map((value) => ({ label: `${value}`, value }));
    const pickerData2 = secondNumbersArray.map((value) => ({ label: `${value}`, value }));
    console.log(pickerData.at((pickerData.length - 1) / 2).value)
    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>


                        <View style={{ flexDirection: 'row', padding: 40 }}>
                            <Picker
                                style={{ backgroundColor: AppColors.stackBackground, width: '80%', height: 215 }}
                                textColor='white'
                                textSize={30}
                                isShowSelectBackground={true}
                                isShowSelectLine={true}
                                selectLineSize={9}
                                pickerData={selectedWeight === 'kg' ? pickerData : pickerData2}
                                selectedValue={selectedWeight === 'kg' ? pickerData.at((pickerData.length - 1) / 2).value : pickerData2.at((pickerData2.length - 1) / 2).value}
                                onValueChange={value => { console.log(value) }}
                            />
                            <Picker
                                style={{ backgroundColor: AppColors.stackBackground, width: '30%', height: 215 }}
                                textColor="white"
                                selectTextColor="white"

                                textSize={30}

                                isShowSelectBackground={false}

                                isShowSelectLine={false}
                                selectLineSize={9}

                                pickerData={['kg', 'g']}
                                selectedValue='kg'
                                onValueChange={value => { setSelectedWeight(value); }}
                            />

                        </View>


                        {Platform.OS === 'ios' ?
                            <DateTimePicker display={'spinner'} value={new Date()} textColor='white' />
                            :
                            <DatePicker style={{ width: '100%' }}
                                minimumDate={new Date('1960-01-01')}
                                maximumDate={new Date('2020-12-31')}
                                onDateChange={date => { console.log(date) }} />
                        }


                    </View>
                </SafeAreaView >
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView>
    )
};
{/**

                            {Platform.OS === 'ios' ?
                                <>
                                    <Picker
                                        selectedValue={selectedLanguage}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedLanguage(itemValue)
                                        }>
                                        <Picker.Item label="Java" value="java" />
                                        <Picker.Item label="JavaScript" value="js" />
                                    </Picker>
                                    <Picker
                                        style={{ backgroundColor: AppColors.stackBackground, width: 100, height: 215 }}
                                        textColor='blue'
                                        textSize={30}
                                        selectTextColor="black"

                                        isShowSelectBackground={true}
                                        isShowSelectLine={true}
                                        selectLineSize={9}

                                        pickerData={pickerData}
                                        selectedValue={40}
                                        onValueChange={value => { console.log(value) }}
                                    />
                                    <Picker
                                        style={{ backgroundColor: AppColors.stackBackground, width: 100, height: 215 }}
                                        textColor="white"
                                        selectTextColor="white"

                                        textSize={30}

                                        isShowSelectBackground={false}

                                        isShowSelectLine={false}
                                        selectLineSize={9}

                                        pickerData={['kg', 'g']}
                                        selectedValue={40}
                                        onValueChange={value => { console.log(value) }}
                                    />
                                </>
                                :
                                <>

                                    <Picker
                                        style={{ backgroundColor: AppColors.stackBackground, width: 100, height: 215 }}
                                        textColor="white"
                                        selectTextColor={"black"} //ios not working

                                        textSize={30}

                                        isShowSelectBackground={false}

                                        isShowSelectLine={false}
                                        selectLineSize={9}

                                        pickerData={['kg', 'g']}
                                        selectedValue={40}
                                        onValueChange={value => { console.log(value) }}
                                    />
                                    <PickerIOS
                                        style={{ backgroundColor: AppColors.stackBackground, width: 100, height: 215 }}
                                        textColor="white"
                                        selectTextColor="white"

                                        textSize={30}

                                        isShowSelectBackground={false}

                                        isShowSelectLine={false}
                                        selectLineSize={9}

                                        pickerData={['kg', 'g']}
                                        selectedValue={40}
                                        onValueChange={value => { console.log(value) }}
                                    />
                                     <Picker
                            selectedValue={selectedLanguage}
                            onValueChange={(text) => {
                                setSelectedLanguage(text);
                            }}
                            style={{
                                width: '50%',
                                backgroundColor:AppColors.stackBackground,
                                alignSelf: 'center',
                            }}
                            itemStyle={{
                                height: 200,
                            }}>
                            <Picker.Item key={'all'} label={'all'} value={'all'} />
                            <Picker.Item key={'all1'} label={'all1'} value={'all1'} />
                            <Picker.Item key={'all2'} label={'all2'} value={'all2'} />
                        </Picker>



                                </>
                            } */}
