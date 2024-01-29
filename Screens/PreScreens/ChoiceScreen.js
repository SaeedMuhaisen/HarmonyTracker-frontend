import React from "react";
import { YStack, XStack, Text, Stack, Button, Input, Separator } from "tamagui";
import CustomHeader from "../../Components/CustomHeader";
import { Platform } from "react-native";
import LabeledInput from "../../Components/Inputs/LabeledInput";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";

import { Image, ButtonIcon } from "tamagui";
import AppleSignInButton from "../../Components/LoginOptions/AppleSignInButton";
import GmailSingInButton from "../../Components/LoginOptions/GmailSingInButton";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../Navigation/ROUTES";
import ChoiceButton from "../../Components/Buttons/ChoiceButton";
import { Route } from "@tamagui/lucide-icons";
export default function () {
    const navigation=useNavigation();
    return (
        <>
            <CustomHeader  />
            <YStack flex={1} justifyContent='flex-start' gap={10} >
                <YStack>
                    <YStack padding={30} alignItems='center' >
                        <Text fontSize={'$10'} fontWeight={'600'} color={'$color.dark7'} textAlign='center'>Already have an account?</Text>
                    </YStack>
                    <YStack paddingHorizontal={20} paddingTop={30} gap={5}>
                        <ChoiceButton text={'Yes'} func={()=>{navigation.navigate(ROUTES.SignInScreen)}}/>
                        <ChoiceButton text={'No, I want to sign up'} func={()=>{navigation.navigate(ROUTES.SignupScreen)}}/>

                    </YStack>
                </YStack>
            </YStack>
        </>

    );
}