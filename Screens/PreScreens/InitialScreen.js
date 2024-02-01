import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity, Platform, Modal } from 'react-native';
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
        <SafeAreaView flex={1} >
            <View style={globalStyles.outerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10
                }}>

                    <Image source={harmony} style={{ height: 50, width: 50 }} />
                    <Text style={globalStyles.H4}>
                        TITLE
                    </Text>
                </View>
                <View style={{ flex: 1.3, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={globalStyles.Card}></View>
                </View>
                <View >
                    <View style={{ alignItems: 'center', gap: 10,paddingBottom:50 }}>
                        {
                            Platform.OS === 'ios' ? (
                                <>
                                    <AppleSSO />
                                    <GoogleSSO />
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



                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ textAlign: 'center', color: 'gray', fontSize:12, paddingHorizontal:40, paddingBottom:10}}>By continuing, you agree with Harmony tracker's <Text style={{ textDecorationLine: 'underline', color: 'rgb(0, 122, 255)' }}>terms of Use</Text> and <Text style={{ textDecorationLine: 'underline', color: 'rgb(0, 122, 255)' }}>Privacy Policy</Text>. Please review them before continuing</Text>
                    </View>
                </View>

            </View>


        </SafeAreaView >
    )
};
