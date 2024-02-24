import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet, ScrollView, Animated, FlatList, KeyboardAvoidingView, Easing, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import { FontAwesome6 } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { localhost } from "../../connectionConfig";


export default function () {
    const userDetails=useSelector(state=>state.userDetails)
    console.log(userDetails)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(localhost+'/api/preview/macros', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDetails),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                else{
                    const responseData = await response.json();
                    console.log('stringified::',responseData)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <ScrollView style={{ flex: 1, gap: 5, padding: 15 }}>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}