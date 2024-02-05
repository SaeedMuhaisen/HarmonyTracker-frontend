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

    return (
        <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>
            <View style={{ flex: 1, paddingHorizontal: 10, gap: 10 }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    paddingHorizontal: 10,
                }}>
                    <Image source={harmony} style={{ height: 50, width: 50 }} />
                    <Text style={{
                        fontSize: 25,
                        fontWeight: '900',
                        color: 'black'
                    }}>
                        TITLE
                    </Text>
                </View>
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


                        <View >
                            <Text style={globalStyles.H4} >Sign in</Text>
                        </View>
                        <View style={{ gap: 10 }}>
                            <TextInput style={{ fontSize: 18, borderRadius: 10, backgroundColor: AppColors.stackBackground, padding: 7, color: 'white' }} placeholder='Email' placeholderTextColor={'gray'} />
                            <TextInput style={{ fontSize: 18, borderRadius: 10, backgroundColor: AppColors.stackBackground, padding: 7 }} placeholder='Password' placeholderTextColor={'gray'} />
                        </View>
                        <View>
                            <TouchableOpacity style={{ backgroundColor: AppColors.primaryYellow, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: AppColors.backgroundColor }}>Login</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 5 }}>
                        <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />

                        <Text style={{ color: 'white', }}>
                            Or
                        </Text>
                        <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: AppColors.SecondaryYellow, flex: 1 }} />
                    </View>
                    <View>
                        <TouchableOpacity style={{ backgroundColor: AppColors.SecondaryYellow, height: 35, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: AppColors.backgroundColor }}>Register Now!</Text>
                        </TouchableOpacity>
                    </View>
                    {/**email */}
                </View>


            </View>

        </SafeAreaView >




        // <SafeAreaView flex={1} backgroundColor={AppColors.stackBackground}>
        //     <View flex={1} >

        //         <View style={{
        //             flexDirection: 'row',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             gap: 10
        //         }}>
        //             <Image source={harmony} style={{ height: 50, width: 50 }} />
        //             <Text style={globalStyles.H4}>
        //                 TITLE
        //             </Text>
        //         </View>

        //         <View style={{ flex: 1 }} >
        //             <View>

        //             </View>
        //             <View style={{ alignItems: 'center', gap: 10, paddingBottom: 50 }}>
        //                 {
        //                     Platform.OS === 'ios' ? (
        //                         <>
        //                             <AppleSSO />
        //                             <GoogleSSO />
        //                             <ContextMenu
        //                                 actions={[
        //                                     {title: "Login With Facebook", systemIcon: Icons.person },
        //                                     {title: "Continue with Email", systemIcon: Icons.envelop },
        //                                     {title: "Sign up with Email", systemIcon: Icons.pencil }]}
        //                                 dropdownMenuMode
        //                                 onPress={(event) => {
        //                                     const {index, indexPath, name} = event.nativeEvent;
        //                                     if (name === "Login With Facebook") {
        //                                         handleLogin();


        //                                     }
        //                                     else if (name === "Sign up with Email") {
        //                                         console.log('sign up with email')
        //                                     }
        //                                     else if (name === "Continue with Email") {
        //                                         console.log('login with email')
        //                                     }
        //                                 }}

        //                             >
        //                                 <Text style={{ fontSize: 12, textDecorationLine: 'underline', alignItems: 'center' }} onPress={() => { setMenuVisible(true); console.log(menuVisible) }}>More Sign in options</Text>
        //                             </ContextMenu>
        //                         </>

        //                     ) : (
        //                         <>
        //                             <GoogleSSO />
        //                             <FacebookSSO />
        //                             <ContextMenu
        //                                 actions={[
        //                                     {title: "Continue with Email", systemIcon: Icons.envelop },
        //                                     {title: "Sign up with Email", systemIcon: Icons.pencil }]}
        //                                 dropdownMenuMode
        //                                 onPress={(event) => {
        //                                     const {index, indexPath, name} = event.nativeEvent;
        //                                     if (name === "Continue with Email") {
        //                                         console.log('login with Email')
        //                                     }
        //                                     else if (name === "Sign up with Email") {
        //                                         console.log('sign up with email')
        //                                     }
        //                                 }}
        //                             >
        //                                 <Text style={{ fontSize: 12, textDecorationLine: 'underline', alignItems: 'center' }} onPress={() => { setMenuVisible(true); console.log(menuVisible) }}>More Sign in options</Text>
        //                             </ContextMenu>
        //                         </>
        //                     )
        //                 }



        //             </View>
        //             <View style={{ alignItems: 'center' }}>
        //                 <Text style={{ textAlign: 'center', color: 'gray', fontSize: 12, paddingHorizontal: 40, paddingBottom: 10 }}>By continuing, you agree with Harmony tracker's <Text style={{ textDecorationLine: 'underline', color: 'rgb(0, 122, 255)' }}>terms of Use</Text> and <Text style={{ textDecorationLine: 'underline', color: 'rgb(0, 122, 255)' }}>Privacy Policy</Text>. Please review them before continuing</Text>
        //             </View>
        //         </View>

        //     </View>


        // </SafeAreaView >
    )
};
