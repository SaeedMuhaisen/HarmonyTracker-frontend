import React, { useEffect, useState } from "react"
import { View, Platform, Text, } from "react-native"
import { AppColors } from "../../../Styles/AppColors"
import { globalStyles } from "../../../GlobalStyles"
import { Picker } from 'react-native-wheel-pick'
import NextQuestion from "../../../Components/Buttons/NextQuestion"
import { useSelector, useDispatch } from "react-redux"
import { updateHeight, updatePreferedUnit, } from "../../../redux/bodyDetailsSlice"
import { convertFtToCm, convertInchesToCm } from "../../../utils/converters"

export default function ({ handleNextQuestion }) {

    const bodyDetails = useSelector(state => state.bodyDetails);
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
            if (bodyDetails.preferredUnit === 'inch') {
                const newValue = Math.round(convertFtToCm(initial) + convertInchesToCm(final));

                updateState(newValue);
            }
        };
        calculateAndUpdateState();
    }, [initial, final]);

    useEffect(() => {
        
    }, [bodyDetails.height])
    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>

                {bodyDetails.preferredUnit === 'cm' ?
                    <Text style={{ ...globalStyles.title, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        {bodyDetails.height} {bodyDetails.preferredUnit}
                    </Text>
                    : <Text style={{ ...globalStyles.title, borderBottomWidth: 1, borderBottomColor: 'black' }}>
                        {initial}" {final}' {bodyDetails.preferredUnit}es
                    </Text>
                }

            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} disabled={false} />
            <View style={{ flexDirection: 'row' }}>
                {
                    bodyDetails.preferredUnit === 'cm' ?
                        <View style={{ flex: 3 }}>
                            <Picker
                                key={1}
                                style={{ backgroundColor: AppColors.stackBackground, }}
                                textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
                                textSize={30}
                                isShowSelectBackground={false}
                                isShowSelectLine={false}
                                selectLineSize={9}
                                pickerData={cmArray}
                                selectedValue={bodyDetails.height}
                                onValueChange={value => dispatch(updateHeight(value))}
                            />
                        </View>
                        :
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                            <Picker
                                style={{ flex: 1, backgroundColor: AppColors.stackBackground, }}
                                textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
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
                                textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                                selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
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
                    textColor={Platform.OS === 'android' ? 'gray' : 'black'}
                    selectTextColor={Platform.OS === 'android' ? '#FFFFF1' : 'black'}
                    textSize={30}
                    isShowSelectBackground={false}
                    isShowSelectLine={false}
                    selectLineSize={9}
                    pickerData={['cm', 'inch']}
                    selectedValue={bodyDetails.preferredUnit}
                    onValueChange={value => {
                        dispatch(updatePreferedUnit(value))
                    }
                    }
                />
            </View>
        </View>
    );
}