import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/PostScreens/HomeScreen';
import ROUTES from './ROUTES';
import InitialScreen from '../Screens/PreScreens/InitialScreen';
import SignupScreen from '../Screens/PreScreens/SignupScreen';
import NavigationBar from '../Components/Bars/NavigationBar';
import SettingsScreen from '../Screens/PostScreens/SettingsScreen';
import MacroScreen from '../Screens/PostScreens/MacroScreen';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { Ionicons, Feather } from '@expo/vector-icons';
import { AppColors } from '../Styles/AppColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignInScreen from '../Screens/PreScreens/SignInScreen';
import EntranceScreen from '../Screens/PreScreens/EntranceScreen';
import { View } from 'react-native';
import SuveryScreen from '../Screens/PreScreens/SuveryScreen';
import Test from '../Screens/TestScreen/TestScreen';
import TestScreen from '../Screens/TestScreen/TestScreen';
import SurveyEndScreen from '../Screens/PreScreens/SurveyEndScreen';
import SurveyResultsScreen from '../Screens/PreScreens/SurveyResultsScreen';
import DietPlanScreen from '../Screens/PreScreens/DietPlanScreen';
import SignUpToContinueScreen from '../Screens/PreScreens/SignUpToContinueScreen';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const MobileNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTES.SignUpToContinueScreen} >
                <Stack.Screen name={ROUTES.EntranceScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <EntranceScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.InitialScreen} options={{ headerShown: false }} >
                    {(props) =>
                        <InitialScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.SignInScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SignInScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.SurveyScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SuveryScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.SignupScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SignupScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={"test"} options={{ headerShown: false }}>
                    {(props) =>
                        <TestScreen />
                    }
                </Stack.Screen>
                <Stack.Screen
                    name={ROUTES.InnerApp}
                    options={{
                        headerShown: false,
                    }}
                    component={InnerApp} />

                <Stack.Screen name={ROUTES.SurveyEndScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SurveyEndScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.SurveyResultsScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SurveyResultsScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.DietPlansScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <DietPlanScreen />
                    }
                </Stack.Screen>
                <Stack.Screen name={ROUTES.SignUpToContinueScreen} options={{ headerShown: false }}>
                    {(props) =>
                        <SignUpToContinueScreen />
                    }
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

function InnerApp() {
    return (



        <Tab.Navigator
            initialRouteName={ROUTES.MacroScreen}
            options={{ headerShown: false }}
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',

                tabBarShowLabel: false,

                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: AppColors.carbsColor,
                    marginBottom: 30,
                    marginHorizontal: 15,
                    borderRadius: 50,
                    paddingBottom: 0,
                    height: 45,
                }
            }}

        >
            <Tab.Screen
                name={ROUTES.MacroScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="scale-outline" size={size} color={color} />
                    ),
                }}
                component={MacroScreen}
            />
            <Tab.Screen
                name={ROUTES.HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
                component={HomeScreen}

            />

            <Tab.Screen

                name={ROUTES.SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" size={size} color={color} />
                    ),
                }}
                component={SettingsScreen}
            />
        </Tab.Navigator>

    )
}

export default MobileNavigation;