import React from 'react';
import { YStack,XStack, Text } from 'tamagui';
import CustomHeader from '../../Components/CustomHeader';

const HomeScreen = () => {
    return (
        <YStack>
            <CustomHeader title={'Get Started'} goBackEnabled={true}/>
        </YStack>
    );
};

export default HomeScreen;