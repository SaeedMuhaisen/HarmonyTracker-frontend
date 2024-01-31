import React from 'react';
import { YStack,XStack, Text } from 'tamagui';
import CustomHeader from '../../Components/CustomHeader';
import store from '../../redux/store';
import { updateUserDetails,updateUserTokens } from '../../redux/userSlice';
const HomeScreen = () => {
    return (
        <YStack>
            <CustomHeader title={'Get Started'} goBackEnabled={true}/>
        </YStack>
    );
};

export default HomeScreen;