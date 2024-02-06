import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import harmony from '../../assets/adaptive-icon.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../GlobalStyles';
import GoogleSSO from '../../Components/SSOButtons/GoogleSSO';
import FacebookSSO from '../../Components/SSOButtons/FacebookSSO';
import AppleSSO from '../../Components/SSOButtons/AppleSSO';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import ContextMenu from "react-native-context-menu-view";
import facebook from '../../assets/facebook.png'

import { AccessToken, LoginButton, LoginManager, Settings } from "react-native-fbsdk-next";
import { updateUserTokens } from '../../redux/userSlice';
import { AppColors } from '../../Styles/AppColors';
import { TextInput } from 'react-native-gesture-handler';
import Card from '../../Components/Cards/Card';
import YellowButton from '../../Components/Buttons/YellowButton';

export default function () {
const navigation=useNavigation();
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
                    <YellowButton title={'I am new here, lets get started!'} func={()=>navigation.navigate(ROUTES.SurveyScreen)} />
                    <YellowButton title={'I already have an account'} func={()=>navigation.navigate(ROUTES.EntranceScreen)}/>
                </View>
            </View>
        </SafeAreaView>
    )
};
