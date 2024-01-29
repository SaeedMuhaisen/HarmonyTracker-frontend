import React from "react";
import { XStack, YStack, Stack, Image, Text, Input } from "tamagui";
import CustomHeader from "../../Components/CustomHeader";
import LabeledInput from "../../Components/Inputs/LabeledInput";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";
import AppleSignInButton from "../../Components/LoginOptions/AppleSignInButton";
import GmailSingInButton from "../../Components/LoginOptions/GmailSingInButton";
import ButtonVar1 from "../../Components/Buttons/ButtonVar1";
import * as AppleAuthentication from 'expo-apple-authentication';
export default function () {
    return (
        <>
            <CustomHeader title={'Create Account'} />
            <YStack flex={1} gap={7} padding={10} >
                <LabeledInput label={'Name'} placeHolder={"What's your first name?"} />
                <LabeledInput label={'Surname'} placeHolder={'last name?'} />
                <LabeledInput label={'Email'} placeHolder={'Whats your email address?'} />
                <LabeledInput label={'Password'} placeHolder={'Chose a strong password'} />
                <Stack paddingTop={10} gap={10}>
                    <ButtonVar1 text={'Create Account'} paddingTop={10} />
                    <LabeledSeparator label={'or'} />
                    <Text fontSize={'$5'} alignSelf="center" fontWeight={'700'} color={'$color.dark7'} >Sign up with the following</Text>
                </Stack>
                <Stack gap={10} paddingVertical={20}>
                    <GmailSingInButton text={'Continue With Google'}/>
                    <AppleSignInButton />
                    


                </Stack>

            </YStack>
        </>
    )
}