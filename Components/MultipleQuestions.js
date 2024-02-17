import React, { useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native";
import { AppColors } from "../Styles/AppColors";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import Ionicons from '@expo/vector-icons/Ionicons'
import FadeInFlatList from "./ReAnimatedComps/FadeInFlatList";
export default function ({ element, handleAnswerSelection, pressedItem }) {
    const dispatch = useDispatch();
    return (
        <FlatList
            key={element.key}
            scrollEnabled={false}
            contentContainerStyle={{ paddingTop: 30, justifyContent: 'center', gap: 10 }}
            data={element.answers}
            renderItem={({ item }) => (
                <TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(element.update(item.val))
                        handleAnswerSelection(item)
                    }}
                >

                    <View style={{
                        backgroundColor: pressedItem?.name === item.name ? AppColors.primaryYellow : AppColors.cardBackground, padding: 15,
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
                        {item.iconProvider === 'Ionicons' ? <Ionicons name={item.icon} size={25} color={pressedItem?.name === item.name ? 'black' : 'white'}></Ionicons> : <></>}
                        <Text style={{ color: pressedItem?.name === item.name ? 'black' : 'white', fontWeight: '700' }}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        />
    )
}