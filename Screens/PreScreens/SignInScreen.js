import React from "react";
import { YStack, XStack, Text, Stack, Button, Input, Separator } from "tamagui";
import CustomHeader from "../../Components/CustomHeader";
import { Platform } from "react-native";
import LabeledInput from "../../Components/Inputs/LabeledInput";
import LabeledSeparator from "../../Components/Seperators/LabeledSeparator";

import { Image, ButtonIcon } from "tamagui";
import AppleSignInButton from "../../Components/LoginOptions/AppleSignInButton";
import GmailSingInButton from "../../Components/LoginOptions/GmailSingInButton";
export default function () {
    return (
        <>
            <CustomHeader title={'Sign In'} />
            <YStack flex={1} justifyContent='flex-start' gap={10} >
                <YStack>
                    <YStack justifyContent='flex-start' gap={10} paddingHorizontal={20}>
                        <LabeledInput label='Email' placeHolder='Enter your Email' />
                        <LabeledInput label='Password' placeHolder='Enter your password' />

                    </YStack>
                    <YStack paddingHorizontal={20} paddingTop={30} gap={5}>
                        <Button backgroundColor={'#DF4042'} height={50} borderRadius={30} onPress={() => { navigation.navigate(ROUTES.HomeScreen) }}>
                            <Text color={'white'} fontWeight={600} fontSize={20}>Sign In</Text>
                        </Button>
                        <Text textAlign='center'>forgot password?</Text>
                    </YStack>
                </YStack>
                <Stack paddingHorizontal={20}>
                    <LabeledSeparator label={'or'} />
                </Stack>
                <YStack paddingHorizontal={20} gap={12}>
                    <GmailSingInButton text={'Continue with Google'}/>
                    <AppleSignInButton text={'Sign in with Apple'}/>
                </YStack>


            </YStack>
        </>

    );
}