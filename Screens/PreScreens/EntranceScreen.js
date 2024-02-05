import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet, KeyboardAvoidingView, Keyboard } from 'react-native';
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
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';


export default function () {
    Settings.setAppID('402103549044920');
    Settings.initializeSDK();

    const handleLogin = async () => {
        try {
            await LoginManager.logInWithPermissions()
            const fbt = await AccessToken.getCurrentAccessToken();
            getTrt(fbt);
        } catch (error) {
            console.log('caught error', error);
        }
    };
    const getTrt = async (fbtoken) => {
        const response = await fetch('http://192.168.1.102:8080/api/register/2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fbtoken),
        });

        if (response.ok) {
            const responseData = await response.json();
            const userData = {
                refreshToken: responseData.access_token,
                token: responseData.refresh_token,
            };
            store.dispatch(updateUserTokens(userData));
        } else {
            console.log('different response: not okay:', response);
        }
    };

    const Icons = Platform.select({
        ios: {
            envelop: 'envelope',
            pencil: 'pencil',
            person: 'person.circle'
        },
        android: {
            envelop: 'mail_outline',
            pencil: 'create',
        }
    })
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const userState = useSelector((state) => state.user);
    console.log(userState.access_token)
    const handleTouchablePress = () => {
        Keyboard.dismiss(); // Close the keyboard when the outside of the TextInput is pressed
    };
    const [isModalVisible, setModalVisible] = useState(true);
    const openModal = () => { setModalVisible(true) };
    const closeModal = () => { setModalVisible(false) };
    return (

            <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >

                        <View style={{alignItems: 'stretch', justifyContent: 'center', paddingHorizontal: 10, gap: 10 }}>

                            {/** Login with email + SSO */}
                            <View style={{
                                ...globalStyles.card,
                                flexDirection: 'column',
                                alignItems: 'stretch'
                            }}>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'stretch',
                                    gap: 10,
                                    paddingBottom: 5,
                                }}>

                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: 10,
                                        paddingHorizontal: 10,
                                    }}>
                                        <Image source={harmony} style={{ height: 50, width: 50 }} />
                                    </View>
                                    <View >
                                        <Text style={{
                                            fontSize: 20,
                                            fontWeight: '800',
                                            color: AppColors.textColor,
                                            alignSelf: "center"
                                        }} >Sign in to your account</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', gap: 10 }}>
                                        {
                                            Platform.OS === 'ios' ? (
                                                <>
                                                    <AppleSSO />
                                                    <GoogleSSO />
                                                    <FacebookSSO />
                                                    <ContextMenu
                                                        actions={[
                                                            { title: "Login With Facebook", systemIcon: Icons.person },
                                                            { title: "Continue with Email", systemIcon: Icons.envelop },
                                                            { title: "Sign up with Email", systemIcon: Icons.pencil }]}
                                                        dropdownMenuMode
                                                        onPress={(event) => {
                                                            const { index, indexPath, name } = event.nativeEvent;
                                                            if (name === "Login With Facebook") {
                                                                handleLogin();


                                                            }
                                                            else if (name === "Sign up with Email") {
                                                                console.log('sign up with email')
                                                            }
                                                            else if (name === "Continue with Email") {
                                                                console.log('login with email')
                                                            }
                                                        }}

                                                    >
                                                        <Text style={{ fontSize: 12, textDecorationLine: 'underline', alignItems: 'center' }} onPress={() => { setMenuVisible(true); console.log(menuVisible) }}>More Sign in options</Text>
                                                    </ContextMenu>
                                                </>

                                            ) : (
                                                <>
                                                    <GoogleSSO />
                                                    <FacebookSSO />
                                                    <ContextMenu
                                                        actions={[
                                                            { title: "Continue with Email", systemIcon: Icons.envelop },
                                                            { title: "Sign up with Email", systemIcon: Icons.pencil }]}
                                                        dropdownMenuMode
                                                        onPress={(event) => {
                                                            const { index, indexPath, name } = event.nativeEvent;
                                                            if (name === "Continue with Email") {
                                                                console.log('login with Email')
                                                            }
                                                            else if (name === "Sign up with Email") {
                                                                console.log('sign up with email')
                                                            }
                                                        }}
                                                    >
                                                        <Text style={{ fontSize: 12, textDecorationLine: 'underline', alignItems: 'center' }} onPress={() => { setMenuVisible(true); console.log(menuVisible) }}>More Sign in options</Text>
                                                    </ContextMenu>
                                                </>
                                            )
                                        }
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingHorizontal: 5 }}>
                                            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />

                                            <Text style={{ color: 'white', }}>
                                                Or continue with
                                            </Text>
                                            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />
                                        </View>


                                    </View>

                                    <View >
                                        <TextInput style={{ fontSize: 18, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'gray', backgroundColor: AppColors.stackBackground, padding: 12, color: 'white' }} placeholder='Email' placeholderTextColor={'gray'} />
                                        <TextInput style={{ fontSize: 18, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: AppColors.stackBackground, padding: 12 }} placeholder='Password' placeholderTextColor={'gray'} />

                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 20, paddingHorizontal: 5 }}>
                                        <Text style={{ color: 'white', textDecorationLine: 'underline', color: AppColors.grayTextColor, }}>
                                            Forgot password?
                                        </Text>
                                    </View>
                                    <View>
                                        <TouchableOpacity style={{ backgroundColor: AppColors.primaryYellow, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: AppColors.backgroundColor }}>Login</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                                {/**email */}
                            </View>


                        </View >

                    </KeyboardAvoidingView>
              

            </SafeAreaView >
    )
};
