import React from 'react';
import { YStack, XStack, Text, Button, Image, ZStack, Card } from 'tamagui';
import CustomHeader from '../../Components/CustomHeader';
import { Platform } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import ROUTES from '../../Navigation/ROUTES';
const InitialScreen = () => {
    const navigation=useNavigation();
    return (
        <YStack flex={1} paddingTop={Platform.OS === 'ios' ? 50 : 0} backgroundColor={'$Stack/BackgroundColor'} justifyContent='space-between' >

            <YStack padding={30} alignItems='center' >
                <Text fontSize={'$10'} fontWeight={'600'} color={'$color.dark7'} textAlign='center'>Your Journey Starts Today</Text>
            </YStack>

            <YStack flex={1}>
                <YStack flex={1} alignSelf='center' justifyContent='center' >
                    <Text>Image placeHolder</Text>
                </YStack>
            </YStack>

            <YStack padding={30} gap={20} >
                <YStack alignItems='center'>
                    <Text fontSize={20} fontWeight={'600'} color={'$color.dark7'}>Everything you need in a </Text>
                    <Text fontSize={20} fontWeight={'600'} color={'$color.dark7'}>Single Platform</Text>
                </YStack>

                <YStack alignItems='center'>
                    <Text fontSize={12} paddingHorizontal={20} color={'$color.dark7'} textAlign='center'>By Pressing Start, you agree to our Tearms of Use and Privacy Policy, Please make sure to read them before continuing</Text>
                </YStack>
                <Button backgroundColor={'#DF4042'} height={50} borderRadius={30} onPress={()=>{navigation.navigate(ROUTES.ChoiceScreen)}}>
                    <Text color={'white'} fontWeight={600} fontSize={20}>Start</Text>
                </Button>
            </YStack>
        </YStack>

    );
};
export default InitialScreen;