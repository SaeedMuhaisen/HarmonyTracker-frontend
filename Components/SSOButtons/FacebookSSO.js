import React from "react";
import {AccessToken,LoginButton,Settings} from "react-native-fbsdk-next";
import { logoStyles } from "../../Styles/LogoStyles";
import { TouchableOpacity} from 'react-native';
import store from '../../redux/store';
import { updateUserTokens } from '../../redux/userSlice';
export default function () {
    Settings.setAppID('402103549044920');
    Settings.initializeSDK();

    const handleLogin = async () => {
        try {
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


    return (
        <>
            <TouchableOpacity
                style={logoStyles.facebookSSO}
            >
                <LoginButton
                    onLogoutFinished={() => { console.log(AccessToken.getCurrentAccessToken) }}
                    onLoginFinished={() => handleLogin()}
                    style={{ width: 210, height: 50 }}
                />
            </TouchableOpacity >
        </>
    );
}
