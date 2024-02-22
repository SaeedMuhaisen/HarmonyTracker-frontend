import React, { useState, useEffect, useRef } from "react";
import { Text, StyleSheet,ScrollView, Animated, FlatList, KeyboardAvoidingView, Easing, TouchableWithoutFeedback, SafeAreaView, View, Platform } from "react-native";
import { AppColors } from "../../Styles/AppColors";
import { globalStyles } from "../../GlobalStyles";
import { FontAwesome6 } from '@expo/vector-icons';


export default function () {
    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground} >
            <ScrollView style={{ flex: 1, gap: 5, padding: 15 }}>
                <View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}