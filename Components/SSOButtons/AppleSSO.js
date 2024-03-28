import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { logoStyles } from '../../Styles/LogoStyles';
import apple from '../../assets/apple.png'
import * as AppleAuthentication from 'expo-apple-authentication'
import store from '../../redux/store';
import { updateUserTokens, setSignedIn } from '../../redux/userSlice';
import { useNavigation } from '@react-navigation/native';
import ROUTES from '../../Navigation/ROUTES';
import { localhost } from '../../connectionConfig';
import { useSelector } from 'react-redux';
import { setMacros } from '../../redux/macroSlice';
import { setBodyDetails } from '../../redux/bodyDetailsSlice';

export default function ({ typeRegister = false }) {
    const navigation = useNavigation();
    const macros = useSelector(state => state.macros)
    const bodyDetails = useSelector(state => state.bodyDetails)
    const login = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });
            if (typeRegister) {
                getTrt(credential);
            }
            else {
                getTrtAndBodyDetailsAndMacros(credential)
            }
        } catch (e) {
            console.log(e);
        }
    }
    const getTrt = async (ctoken) => {
        console.log(ctoken);

        const response = await fetch(localhost + '/api/register/3', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                credentialsToken: ctoken,
                bodyDetails: bodyDetails,
                macros: macros,
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            const userData = {
                refreshToken: responseData.access_token,
                token: responseData.refresh_token,
            };
            console.log(responseData)
            store.dispatch(updateUserTokens(userData));
            store.dispatch(setSignedIn(true));
            console.log(responseData)

        } else {
            console.log('different response: not okay:', response);
        }
    };
    const getTrtAndBodyDetailsAndMacros = async (ctoken) => {


        const response = await fetch(localhost + '/api/register/3Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ctoken)
            
        });

        if (response.ok) {
            const responseData = await response.json();
            const userData = {
                refreshToken: responseData.access_token,
                token: responseData.refresh_token,
            };
            const bodyDetails = responseData.bodyDetails;
            const macros = responseData.macros;
            store.dispatch(setBodyDetails({
                gender: bodyDetails.gender,
                birthDate: bodyDetails.birthDate,
                preferredUnit: bodyDetails.preferredUnit,
                height: bodyDetails.height,
                preferredWeightUnit: bodyDetails.preferredWeightUnit,
                weight: bodyDetails.weight,
                extraData: bodyDetails.extraData,
                neckNarrowest: bodyDetails.neckNarrowest,
                waistNavel: bodyDetails.waistNavel,
                hipWidest: bodyDetails.hipWidest,
                activityLevel: bodyDetails.activityLevel,
                goal: bodyDetails.goal,
            }
            ))
            store.dispatch(setMacros(
                {
                    carbs: macros.carbs,
                    fat: macros.fat,
                    protein: macros.protein,
                    calories: macros.calories
                }
            ))
            console.log(responseData)
            store.dispatch(updateUserTokens(userData));
            store.dispatch(setSignedIn(true));
            console.log(responseData)

        } else {
            console.log('different response: not okay:', response);
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
                width: '100%',
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