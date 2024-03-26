import React,{useState,useEffect} from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import NextQuestion from "../../Components/Buttons/NextQuestion";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../Navigation/ROUTES";
import * as SecureStore from 'expo-secure-store';
export default function () {
   
    const [tokens, setToken] = useState(null);
    const user=useSelector(state=>state.user)
    const bodyDetails=useSelector(state=>state.bodyDetails)
    const macro=useSelector(state=>state.macros)
    const foodLog=useSelector(state=>state.foodLog)
    const dailyIntake=useSelector(state=>state.dailyIntake)
    useEffect(() => {
        const getTokens = async () => {
            let result = await SecureStore.getItemAsync('TOKENS')
            console.log('Secure tokens:', await SecureStore.getItemAsync('TOKENS'))
            console.log('Secure macros:', await SecureStore.getItemAsync('MACROS'))
            console.log('Secure surveyResult:', await SecureStore.getItemAsync('SURVEYRESULT'))
            console.log('Secure bodyDetails:', await SecureStore.getItemAsync('BODYDETAILS'))
            console.log('Secure user:', await SecureStore.getItemAsync('USER'))

            console.log('user:',user)
            console.log('bodyDetails:',bodyDetails)
            console.log('macro:',macro)
            console.log('foodLog:',foodLog)
            console.log('dailyIntake:',dailyIntake)
            return result;
        }

        setToken(getTokens)
    }, [])
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const deleteSecureStorage = async () => {
        await SecureStore.deleteItemAsync('MACROS',  {})
        await SecureStore.deleteItemAsync('SURVEYRESULT',  {})
        await SecureStore.deleteItemAsync('BODYDETAILS',  {})
        await SecureStore.deleteItemAsync('USER',  {})
    }
    const handleLogout = async() => {
        await deleteSecureStorage()
        dispatch({ type: 'store/reset' });
        SecureStore.deleteItemAsync()
        navigation.navigate(ROUTES.InitialScreen)
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback>
                <View>
                    <Text>Hello</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flex: 1, padding: 10, }}>

                <NextQuestion title="logout" goNext={handleLogout} />
            </View>
        </SafeAreaView>
    )
}