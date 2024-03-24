import React ,{useState,useEffect} from 'react';
import { View,  } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppColors } from '../../Styles/AppColors';
import NextQuestion from '../../Components/Buttons/NextQuestion';
import navigation from '../../utils/navigation';
import useCustomNavigation from '../../utils/navigation';
import * as SecureStore from 'expo-secure-store';
import {Test} from '../../utils/Functions/Test'
export default function () {
    const navigation=useNavigation()
    const testInstance = new Test();
    const [tokens, setToken] = useState(null);
    useEffect(() => {
      const getTokens = async () => {
        
        console.log('tokens:',await SecureStore.getItemAsync('TOKENS'))
        console.log('macros:',await SecureStore.getItemAsync('MACROS'))
        console.log('surveyResult:',await SecureStore.getItemAsync('SURVEYRESULT'))
        console.log('userDetails:',await SecureStore.getItemAsync('USERDETAILS'))
        console.log('user:',await SecureStore.getItemAsync('USER'))
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
