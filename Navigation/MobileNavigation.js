import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/PostScreens/HomeScreen';
import ROUTES from './ROUTES';
import { XStack, YStack, Text } from 'tamagui';
import { Platform } from 'react-native';
import InitialScreen from '../Screens/PreScreens/InitialScreen';
import ChoiceScreen from '../Screens/PreScreens/ChoiceScreen';
import SignInScreen from '../Screens/PreScreens/SignInScreen';
import SignupScreen from '../Screens/PreScreens/SignupScreen';


const Stack = createStackNavigator();

const MobileNavigation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName={ROUTES.InitialScreen} >
                <Stack.Screen name={ROUTES.InitialScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <InitialScreen />
                    }
                </Stack.Screen>

                <Stack.Screen name={ROUTES.ChoiceScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <ChoiceScreen />
                    }
                </Stack.Screen>

                <Stack.Screen name={ROUTES.SignupScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SignupScreen />
                    }
                </Stack.Screen>

                <Stack.Screen name={ROUTES.SignInScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SignInScreen />

                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.HomeScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <HomeScreen />

                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>

    );
};


export default MobileNavigation;