import React, { useCallback } from "react";
import { View, Text, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../GlobalStyles";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedProps,
    useDerivedValue,
} from 'react-native-reanimated';


import Svg, { Circle } from 'react-native-svg';

export default function () {

    return (


        <>
            <View>
                <Svg style={{ backgroundColor: 'purple' }}  >

                </Svg>
            </View>



        </>



    )
}

