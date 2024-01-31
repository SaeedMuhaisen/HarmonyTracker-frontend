import React from 'react';
import { View, Text, ScrollView, ViewComponent, Image, Button, TouchableOpacity } from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import { Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
import harmony from '../../assets/adaptive-icon.png'
import { LinearGradient } from 'react-native-svg';
import Background from '../../Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../GlobalStyles';
import GoogleSSO from '../../Components/SSOButtons/GoogleSSO';
import FacebookSSO from '../../Components/SSOButtons/FacebookSSO';
import AppleSSO from '../../Components/SSOButtons/AppleSSO';

export default function () {
    const navigation = useNavigation();

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
