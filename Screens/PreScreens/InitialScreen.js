import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../Styles/AppColors';

import AppLoading from 'expo-app-loading';
import NextQuestion from '../../Components/Buttons/NextQuestion';
import { globalStyles } from '../../GlobalStyles';

export default function () {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            backgroundColor: AppColors.stackBackground,

        }}>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 5 }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ gap: 5 }}>
                    <NextQuestion title='I am new here, lets get started!' goNext={() => navigation.navigate(ROUTES.SurveyScreen)} />
                    <NextQuestion title='I already have an account' goNext={() => navigation.navigate(ROUTES.EntranceScreen)} />
                </View>
            </View>
        </SafeAreaView>
    )
};
