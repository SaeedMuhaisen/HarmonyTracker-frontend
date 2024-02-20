import React, { useState } from 'react';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { logoStyles } from '../../Styles/LogoStyles';
import google from '../../assets/google.png'
import store from '../../redux/store';
import { updateUserTokens } from '../../redux/userSlice';
import { localhost } from '../../connectionConfig';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../Navigation/ROUTES';
export default function () {
    const navigation=useNavigation();
    GoogleSignin.configure({
        iosClientId: '510593510774-r1dr6fgpg9ec50rk377kta6g9rh8ujlg.apps.googleusercontent.com',
        webClientId: '510593510774-o6att94shbis8pubmtcc6u5q60b9ug2d.apps.googleusercontent.com',
    });
    const login = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const credential = await GoogleSignin.signIn();

            console.log(JSON.stringify(credential, null, 2))

            getTrt(credential.idToken);
        } catch (e) {
            console.log(e);
        }
    }
    const getTrt = async (ctoken) => {
        const response = await fetch(localhost + '/api/register/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ctoken,
        });
        if (response.ok) {
            const responseData = await response.json();
            const userData = {
                refreshToken: responseData.access_token,
                token: responseData.refresh_token,
                initialized: responseData.initialized,
            };
            store.dispatch(updateUserTokens(userData));
            console.log(responseData)
            if (!responseData.initialized) {
                navigation.navigate(ROUTES.SurveyScreen)
            }
            else {
                navigation.navigate(ROUTES.InnerApp)
            }
        }
    };

    return (
        <TouchableOpacity
            style={logoStyles.googleSSO}
            onPress={async () => {
                try {
                    login();
                } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {

                    } else if (error.code === statusCodes.IN_PROGRESS) {

                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {

                    } else {

                    }
                }
            }}
        >
            <Image source={google} style={{ height: 18, width: 18 }} />
            <Text style={{ fontSize: 15, fontWeight: 700, color: 'black' }}>Continue with Google</Text>

        </TouchableOpacity >

    )
};