import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import React, { useEffect, useState } from "react";
import {
    AccessToken,
    LoginButton,
    Settings,
    ShareDialog,
    LoginManager,

} from "react-native-fbsdk-next";

import { StyleSheet, Text, View, Button } from 'react-native';
export default function () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('')
    const [rtoken, setRToken] = useState('')
    const [fbAccessToken, setFbAccessToken] = useState('')

    Settings.setAppID('402103549044920');
    Settings.initializeSDK();
    useEffect(() => {
        console.log('token: ', token);
        console.log('refresh token: ', rtoken);
    }, [token, rtoken]);

    const handleLogin = async () => {
        try {
            const fbt = await AccessToken.getCurrentAccessToken();
            console.log('retrieved data from facebook: ', fbt);
            setFbAccessToken(fbt);
            console.log('saved data retrieved in fbAccessToken: ', fbt);
            getTrt(fbt);
        } catch (error) {
            console.log('caught error', error);
        }
    };

    const getTrt = async (fbtoken) => {
        console.log(fbtoken);
        const response = await fetch('http://192.168.1.102:8080/api/register/2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fbtoken),
        });

        if (response.ok) {
            const responseData = await response.json();
            setToken(responseData.access_token);
            setRToken(responseData.refresh_token);

        } else {
            console.log('different response: not okay:', response);
        }
    };


    return (
        <View style={styles.container}>
            <LoginButton
                onLogoutFinished={() => { console.log(AccessToken.getCurrentAccessToken) }}
                onLoginFinished={() => handleLogin()}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {


    },
});
