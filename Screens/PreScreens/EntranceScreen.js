import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal, StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
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

import { AccessToken, LoginButton, LoginManager, Settings } from "react-native-fbsdk-next";
import { updateUserTokens } from '../../redux/userSlice';
import { AppColors } from '../../Styles/AppColors';

import * as SecureStore from 'expo-secure-store';
export default function () {


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
    const user= useSelector((state) => state.user);
    const bodyDetails= useSelector((state) => state.bodyDetails);
    const signedIn=useSelector(state=>state.user.signedIn)
    useEffect(() => {
        const saveTokens = async () => {
            if (signedIn === true) {
                console.log('signed IN!')
                await SecureStore.setItemAsync('USER', JSON.stringify(user));
                await SecureStore.setItemAsync('BODYDETAILS', JSON.stringify(bodyDetails));
                navigation.navigate(ROUTES.InnerApp)
            }
        }
        saveTokens()
    }, [signedIn])
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
                <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                        <View style={{
                            ...globalStyles.card,
                            flexDirection: 'column',
                            alignItems: 'stretch',

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
                                    <Image source={harmony} style={{ height: 80, width: 80, borderRadius: 20 }} />
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
                                                <AppleSSO typeRegister={false} />
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
                                <View style={{ gap: 5 }}>
                                    <TouchableOpacity style={{ backgroundColor: AppColors.carbsColor, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: AppColors.backgroundColor }}>Login</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>


                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate(ROUTES.SignupScreen) }}>
                            <Text style={{ fontSize: 14, color: 'gray', textDecorationLine: 'underline' }}>Create new account with Email</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView >
            </TouchableWithoutFeedback >
        </KeyboardAvoidingView>
    )
};
