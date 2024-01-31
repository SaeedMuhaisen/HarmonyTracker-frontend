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
export default function () {
    GoogleSignin.configure({
        iosClientId: '510593510774-r1dr6fgpg9ec50rk377kta6g9rh8ujlg.apps.googleusercontent.com',
        webClientId: '510593510774-o6att94shbis8pubmtcc6u5q60b9ug2d.apps.googleusercontent.com',
    });

    return (
        <TouchableOpacity
            style={logoStyles.googleSSO}
            onPress={async () => {
                try {
                    await GoogleSignin.hasPlayServices();
                    const userInfo = await GoogleSignin.signIn();

                    console.log(JSON.stringify(userInfo, null, 2))
                    const response = await fetch('http:/192.168.1.102:8080/api/register/1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json', // Set the correct content type
                        },
                        body: userInfo.idToken,
                    });
                    if (response.ok) {
                        const responseData = await response.json();
                        const userData = {
                            refreshToken: responseData.access_token,
                            token: responseData.refresh_token,
                        };
                        store.dispatch(updateUserTokens(userData));
                        
                        
                    }
                } catch (error) {
                    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                        // user cancelled the login flow
                    } else if (error.code === statusCodes.IN_PROGRESS) {
                        // operation (e.g. sign in) is in progress already
                    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                        // play services not available or outdated
                    } else {
                        // some other error happened
                    }
                }
            }}
        >
            <Image source={google} style={{ height: 18, width: 18 }} />
            <Text style={{ fontSize: 15, fontWeight: 700, color: 'black' }}>Continue with Google</Text>

        </TouchableOpacity>

    )
};