import React from "react";
import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, StatusBar, TouchableWithoutFeedback, Keyboard } from "react-native";


export default function ({ children }) {
    return (
        <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, flex: 1, }}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                    {children}
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}