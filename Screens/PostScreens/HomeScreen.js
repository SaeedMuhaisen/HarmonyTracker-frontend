import React from 'react';
import CustomHeader from '../../Components/Bars/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { View,Text } from 'react-native';

const HomeScreen = () => {
    const macros = useSelector(state => state.macros)
    console.log(macros)
    return (

        <SafeAreaView style={{flex:1}}>
            <CustomHeader />
            <Text>{macros.fat}</Text>
        </SafeAreaView>


    );
};

export default HomeScreen;