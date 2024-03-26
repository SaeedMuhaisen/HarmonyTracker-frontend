import React, { useState, useEffect } from 'react';
import { View, } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../Styles/AppColors';
import NextQuestion from '../../Components/Buttons/NextQuestion';
import navigation from '../../utils/navigation';
import useCustomNavigation from '../../utils/navigation';
import * as SecureStore from 'expo-secure-store';
import { Test } from '../../utils/Functions/Test'
import { useSelector } from 'react-redux';
export default function () {
    const navigation = useNavigation()
    const [tokens, setToken] = useState(null);
    const user=useSelector(state=>state.user)
    const userDetails=useSelector(state=>state.userDetails)
    const macro=useSelector(state=>state.macros)
    const foodLog=useSelector(state=>state.foodLog)
    const dailyIntake=useSelector(state=>state.dailyIntake)
    useEffect(() => {
        const getTokens = async () => {
            let result = await SecureStore.getItemAsync('TOKENS')
            console.log('Secure tokens:', await SecureStore.getItemAsync('TOKENS'))
            console.log('Secure macros:', await SecureStore.getItemAsync('MACROS'))
            console.log('Secure surveyResult:', await SecureStore.getItemAsync('SURVEYRESULT'))
            console.log('Secure userDetails:', await SecureStore.getItemAsync('USERDETAILS'))
            console.log('Secure user:', await SecureStore.getItemAsync('USER'))

            console.log('user:',user)
            console.log('userDetails:',userDetails)
            console.log('macro:',macro)
            console.log('foodLog:',foodLog)
            console.log('dailyIntake:',dailyIntake)
            return result;
        }

        setToken(getTokens)
    }, [])
    // useEffect(()=>{
    //     console.log(tokens,'updated!!!!! and available')
    // },[tokens])
    return (
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            backgroundColor: AppColors.stackBackground,

        }}>
            <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 5 }}>
                <View style={{ flex: 1 }}>

                </View>
                <View style={{ gap: 5 }}>
                    <NextQuestion title='I am new here, lets get started!' goNext={() => navigation.navigate(ROUTES.SurveyScreen)} />
                    <NextQuestion title='I already have an account' goNext={() => navigation.navigate(ROUTES.EntranceScreen)} />
                </View>
            </View>
        </SafeAreaView>
    )
};
