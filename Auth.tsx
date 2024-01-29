import React, { useState } from 'react';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import { View, Text } from 'react-native';

export default function () {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('')
    const [rtoken, setRToken] = useState('')
    GoogleSignin.configure({
        iosClientId:'510593510774-r1dr6fgpg9ec50rk377kta6g9rh8ujlg.apps.googleusercontent.com',
        webClientId: '510593510774-o6att94shbis8pubmtcc6u5q60b9ug2d.apps.googleusercontent.com', 
        // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    });

    return (
        <View style={{
            
        }}>
            <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
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
                            setLoggedIn(true);
                            setToken(responseData.access_token);
                            setRToken(responseData.refresh_token);
                            console.log(responseData)
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

            />
            <Text>access token:{token}</Text>
            <Text>refresh token:{rtoken}</Text>
            <Text>Logged In:{loggedIn}</Text>
        </View>

    )
};