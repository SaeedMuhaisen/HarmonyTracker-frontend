import React from "react";
import { AccessToken, LoginButton, LoginManager, Settings } from "react-native-fbsdk-next";
import { logoStyles } from "../../Styles/LogoStyles";
import { TouchableOpacity,Image,Text } from 'react-native';
import store from '../../redux/store';
import { updateUserTokens,setSignedIn } from '../../redux/userSlice';
import facebook from '../../assets/facebook.png'
import { localhost } from "../../connectionConfig";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/ROUTES";
export default function () {
    Settings.setAppID('402103549044920');
    Settings.initializeSDK();
    const navigation=useNavigation();
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
        const response = await fetch(localhost+'/api/register/2', {
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
                initialized: responseData.initialized,
            };
            store.dispatch(updateUserTokens(userData));
            store.dispatch(setSignedIn(true));
            console.log(responseData)
            if (!responseData.initialized) {
                navigation.navigate(ROUTES.SurveyScreen)
            }
            else {
                navigation.navigate(ROUTES.InnerApp)
            }
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
