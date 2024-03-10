import React from "react"
import { View, Platform, Text } from "react-native"
import { globalStyles } from "../../../GlobalStyles"
import { DatePicker } from 'react-native-wheel-pick';
import NextQuestion from "../../../Components/Buttons/NextQuestion"
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from "react-redux"
import { updateBirthDate } from "../../../redux/userDetailsSlice"
import { monthNames } from "../../../Consts/MonthNames"

export default function ({ handleNextQuestion }) {
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    const birthDate = new Date(userDetails.birthDate);

    return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ ...globalStyles.title, borderBottomWidth: 1, borderBottomColor: 'gray' }}>
                    {monthNames[birthDate.getMonth()]} {birthDate.getDate()}, {birthDate.getFullYear()}
                </Text>
            </View>
            <NextQuestion goNext={handleNextQuestion} noRadius={true} />
            {
                Platform.OS === 'ios' ?
                    <View style={{ padding: 0, marginLeft: 0, }}>
                        <DateTimePicker
                            display={'spinner'}
                            value={new Date(userDetails.birthDate)}
                            dateFormat='day month year'
                            onChange={(date) => {
                                const selectedDate = new Date(date.nativeEvent.timestamp);
                                dispatch(updateBirthDate({ birthDate: selectedDate.getTime() }));
                            }}
                            textColor='white'
                            maximumDate={new Date('2020-01-01')}
                        />
                    </View>
                    :
                    <DatePicker
                        style={{ backgroundColor: 'transparent' }}
                        textColor='white'
                        minimumDate={new Date('1960-01-01')}
                        maximumDate={new Date('2020-01-01')}
                        onDateChange={(date) => {
                            const timestamp = new Date(date).getTime(); // Convert date to timestamp
                            const selectedDate = new Date(timestamp);
                            const year = selectedDate.getFullYear();
                            const month = selectedDate.getMonth() + 1; // Month is zero-indexed, so add 1
                            const day = selectedDate.getDate();
                            const extractedDate = new Date(year, month - 1, day);
                            dispatch(updateBirthDate({ birthDate: extractedDate.getTime() }));
                        }}
                    />
            }
        </View >
    );
}