import React, { useEffect ,useState} from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import harmony from '../../assets/adaptive-icon.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../GlobalStyles';
import GoogleSSO from '../../Components/SSOButtons/GoogleSSO';
import FacebookSSO from '../../Components/SSOButtons/FacebookSSO';
import AppleSSO from '../../Components/SSOButtons/AppleSSO';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
export default function () {
    const navigation = useNavigation();
    const userState=useSelector((state)=> state.user);
    console.log(userState.access_token)

    return (
        <SafeAreaView flex={1} >
            <View style={globalStyles.outerContainer}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10
                }}>

                    <Image source={harmony} style={{ height: 50, width: 50 }} />
                    <Text style={globalStyles.H4}>
                        TITLE
                    </Text>
                </View>
                <View style={{ flex: 1.3, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={harmony} style={{ flex: 1, resizeMode: 'repeat' }} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center', gap: 10 }}>
                        <AppleSSO/>
                        <GoogleSSO />
                        <FacebookSSO/>
                    </View>        
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Text fontSize={20} fontWeight={'600'} color={'$color.dark7'}>Everything you need in a </Text>
                    <Text fontSize={20} fontWeight={'600'} color={'$color.dark7'}>Single Platform</Text>
                    <View style={{ width: "100%", paddingHorizontal: 30 }}>
                        <TouchableOpacity style={{ backgroundColor: '#DF4042', alignItems: 'center', borderRadius: 60 }} onPress={() => { navigation.navigate(ROUTES.ChoiceScreen) }} >
                            <Text style={{ fontSize: 22, padding: 10, color: 'white' }}>Start</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    )
};
