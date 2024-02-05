import React from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, SafeAreaView, View, Text,Platform,Keyboard} from "react-native";
import { AppColors } from "../../Styles/AppColors";
export default function () {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}