import React from 'react';
import CustomHeader from '../../Components/Bars/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {

    return (

        <SafeAreaView style={{flex:1}}>
            <CustomHeader />
            
        </SafeAreaView>


    );
};

export default HomeScreen;