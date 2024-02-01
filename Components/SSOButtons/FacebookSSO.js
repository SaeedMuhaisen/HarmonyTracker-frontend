import React from "react";
import { AccessToken, LoginButton, LoginManager, Settings } from "react-native-fbsdk-next";
import { logoStyles } from "../../Styles/LogoStyles";
import { TouchableOpacity,Image,Text } from 'react-native';
import store from '../../redux/store';
import { updateUserTokens } from '../../redux/userSlice';
import facebook from '../../assets/facebook.png'

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


    return (
        <>
            <TouchableOpacity
                style={logoStyles.facebookSSO}
                onPress={async () => {
                    handleLogin();
                }}
            >
                <Image source={facebook} style={{ height: 20, width: 20 }} />
                <Text style={{ fontSize: 15, fontWeight: 700, color: 'white' }}>Continue with Facebook</Text>
        
            </TouchableOpacity >
        </>
    );
}
