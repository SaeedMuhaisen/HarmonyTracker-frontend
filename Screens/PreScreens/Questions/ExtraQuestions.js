import React, { useEffect, useState } from "react"
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Image, Keyboard, TextInput, Platform, Text, TouchableHighlight, TouchableOpacity, SafeAreaViewBase, StatusBar } from "react-native"
import { AppColors } from "../../../Styles/AppColors"
import { globalStyles } from "../../../GlobalStyles"
import { Picker } from 'react-native-wheel-pick'
import NextQuestion from "../../../Components/Buttons/NextQuestion"
import { useDispatch, useSelector } from "react-redux"

import { convertCmToInches, convertInchesToCm } from "../../../utils/converters"
import { updatePreferedUnit } from "../../../redux/userDetailsSlice"
const CONVERSION_FACTOR = 1.0;
export default function ({ handleNextQuestion, comp }) {
    const userDetails = useSelector(state => state.userDetails)
    const preferredUnit = useSelector(state => state.userDetails.preferredUnit)

    const [initial, setInitial] = useState(preferredUnit === 'cm' ? Math.floor(comp.state) : Math.floor(convertCmToInches(comp.state)));
    const [final, setFinal] = useState(preferredUnit === 'cm' ? 10 * (comp.state - Math.floor(comp.state)).toFixed(1)
        : 10 * (convertCmToInches(comp.state) - Math.floor(convertCmToInches(comp.state))).toFixed(1)
    );

    const dispatch = useDispatch();
    const intArray = Array.from({ length: 400 }, (_, index) => index + 0);
    const dArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    useEffect(() => {
        const updateState = (value) => {
            dispatch(comp.updateState(value));
        };
        const calculateAndUpdateState = () => {
            const newValue = preferredUnit === 'cm'
                ? initial * CONVERSION_FACTOR + final / 10
                : convertInchesToCm(initial * CONVERSION_FACTOR + final / 10);
            updateState(newValue);
        };
        calculateAndUpdateState();
    }, [initial, final, preferredUnit]);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 6, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={userDetails.gender === 'male' ? comp.imgSourceMale : comp.imgSourceFemale} resizeMode='contain' style={{ height: '100%' }} />
            </View>

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                <Text style={{ ...globalStyles.title, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                    {initial || 0}.{final || 0} {preferredUnit === "cm" ? <>cm</> : <> inches</>}
                </Text>

            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} />
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3, flexDirection: 'row' }}>
                    <Picker
                        key={comp.key}
                        style={{ flex: 1, backgroundColor: AppColors.stackBackground }}
                        textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                        selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
                        textSize={30}
                        isShowSelectBackground={false}
                        isShowSelectLine={false}
                        selectLineSize={9}
                        pickerData={intArray}
                        selectedValue={initial}
                        onValueChange={(value) => {
                            setInitial(value);
                        }}
                    />
                    <Picker

                        style={{ flex: 1, backgroundColor: AppColors.stackBackground }}
                        textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                        selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
                        textSize={30}
                        isShowSelectBackground={false}
                        isShowSelectLine={false}
                        selectLineSize={9}
                        pickerData={dArray}
                        selectedValue={final}
                        value={final}
                        onValueChange={(value) => {
                            setFinal(value)
                        }}
                    />
                </View>

                <Picker

                    style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                    textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                    selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
                    textSize={30}
                    isShowSelectBackground={false}
                    isShowSelectLine={false}
                    selectLineSize={9}
                    pickerData={['cm', 'inch']}
                    selectedValue={preferredUnit}
                    onValueChange={value => {
                        dispatch(updatePreferedUnit(value))
                    }
                    }
                />
            </View>
        </View>
    );
}