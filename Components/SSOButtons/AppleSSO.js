import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { logoStyles } from '../../Styles/LogoStyles';
import apple from '../../assets/apple.png'
import * as AppleAuthentication from 'expo-apple-authentication'
export default function () {
    const [appleAuthAvailable, setAppleAuthAvailable] = useState(true);
    const [userToken, setUserToken] = useState();
    console.log("hi");
    const [token, setToken] = useState('')
    const [rtoken, setRToken] = useState('')
    const login = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            setUserToken(credential);
            getTrt(credential);
        } catch (e) {
            console.log(e);
        }
    }
    const getTrt = async (ctoken) => {
        console.log(ctoken);
        const response = await fetch('http://192.168.1.102:8080/api/register/3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ctoken),
        });

        if (response.ok) {
            const responseData = await response.json();
            setToken(responseData.access_token);
            setRToken(responseData.refresh_token);

        } else {
            console.log('different response: not okay:', response);
        }
    };
    useEffect(() => {
        console.log('token: ', token);
        console.log('refresh token: ', rtoken);
    }, [token, rtoken]);
    const logout = async () => {
        setUserToken(undefined);
    };


    const getAppleAuthContent = () => {
        if (!userToken) {
            return <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={styles.button}
                onPress={login}
            />
        } else {
            return (
                <Button style={styles.button} title="Sign Out" onPress={logout}>

                </Button>
            )

        }
    };

    return (

        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                width: 250,
                paddingHorizontal: 15,
                gap: 5,
                borderRadius: 7,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,
        
                elevation: 6,
            }}
            onPress={login}
        />

    )
};