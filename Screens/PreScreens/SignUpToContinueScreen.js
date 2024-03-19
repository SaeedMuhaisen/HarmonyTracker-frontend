import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput, RootTagContext } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import harmony from '../../assets/Logo.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../GlobalStyles';
import GoogleSSO from '../../Components/SSOButtons/GoogleSSO';
import FacebookSSO from '../../Components/SSOButtons/FacebookSSO';
import AppleSSO from '../../Components/SSOButtons/AppleSSO';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import ContextMenu from "react-native-context-menu-view";
import facebook from '../../assets/facebook.png'
import Ionicons from '@expo/vector-icons/Ionicons'
import { AccessToken, LoginButton, LoginManager, Settings } from "react-native-fbsdk-next";
import { updateUserTokens } from '../../redux/userSlice';
import { AppColors } from '../../Styles/AppColors';


import OuterContainer from '../../Components/Views/OuterContainer';
import TopBar from '../../Components/SurveyComponents/TopBar';
import NavigationBar from '../../Components/Bars/NavigationBar';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import NextQuestion from '../../Components/Buttons/NextQuestion';
import { Checkbox } from 'react-native-paper';
import LabeledSeparator from '../../Components/Seperators/LabeledSeparator';

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
    const signedIn = useSelector(state => state.user.signedIn)
    useEffect(() => {
        console.log('hello')
        if (signedIn === true) {
            navigation.navigate(ROUTES.InnerApp)
        }
    }, [signedIn])
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const userState = useSelector((state) => state.user);
    console.log(userState.access_token)
    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <SafeAreaView flex={1} backgroundColor={'white'}>

                <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 10 }} >
                    <View style={{ flex: 1, }}>

                        <View style={{ alignItems: 'center', paddingVertical: 20, }}>
                            <Image source={harmony} style={{ height: 80, width: 80, borderRadius: 20 }} />
                            <Text style={{ ...globalStyles.title }}>Let's set up your account!</Text>
                        </View>

                        <View style={{ gap: 10, flex: 1, }}>
                            <View style={globalStyles.signUpInputContainer}>
                                <Feather name="user" size={24} color="black" />
                                <TextInput style={globalStyles.signUpInput} placeholder='First Name' placeholderTextColor={'gray'} />
                            </View>
                            <View style={globalStyles.signUpInputContainer}>
                                <Fontisto name="email" size={24} color="black" />
                                <TextInput style={globalStyles.signUpInput} placeholder='Email' placeholderTextColor={'gray'} />
                            </View>
                            <View style={globalStyles.signUpInputContainer}>
                                <Ionicons name="key-outline" size={24} color="black" />
                                <TextInput style={{...globalStyles.signUpInput}} secureTextEntry={true}  placeholder='Password' placeholderTextColor={'gray'} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ ...globalStyles.body, flex: 1, fontSize: 12, textAlign: 'center', paddingHorizontal: 10, color: 'gray' }}>By Continuing you accept terms and conditions of Harmony Tracker</Text>
                            </View>

                            <NextQuestion />



                        </View>

                        <View style={{ alignItems: 'center', gap: 10 }}>
                            <LabeledSeparator text={'Or continue with'} />
                            {
                                Platform.OS === 'ios' ? (
                                    <>
                                        <AppleSSO />
                                        <GoogleSSO />
                                        <FacebookSSO />
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
                        </View>


                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};
