import React, { useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { AppColors } from "../Styles/AppColors";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import Ionicons from '@expo/vector-icons/Ionicons'
export default function ({ answers, handleAnswerSelection, pressedItem, updateState }) {
    const dispatch = useDispatch();
    return (
        <FlatList
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 30, justifyContent: 'center', gap: 10 }}
            data={answers}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback
                    onPress={() => { 
                        dispatch(updateState(item.name))
                        handleAnswerSelection(item)
                    }}
                >
                    <View style={{
                        backgroundColor: pressedItem === item ? AppColors.primaryYellow : AppColors.cardBackground, // Changed to simpler color
                        padding: 15,
                        gap: 5,
                        borderRadius: 7,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 6,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        {item.iconProvider === 'Ionicons' ? <Ionicons name={item.icon} size={25} color={pressedItem === item ? 'black' : 'white'}></Ionicons> : <></>}
                        <Text style={{ color: pressedItem === item ? 'black' : 'white', fontWeight: '700' }}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    )
}