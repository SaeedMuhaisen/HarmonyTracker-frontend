import React from "react";
import {View} from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

export default function ({outerPaddingSize,pointerPos}) {
    const position = `${(pointerPos-18)/17*100}%`;
    return (
        <LinearGradient
            colors={['rgb(247,235,51)', 'rgba(170,233,84,1)', 'rgba(250,177,64,1)', 'rgba(231,62,53,1)', 'rgba(193,32,48,1)']}
            locations={[0, 0.25, 0.5, 0.75, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ height: 12, borderRadius: 20, position: 'relative', paddingHorizontal: outerPaddingSize / 2 }}
        >
            <View style={{ height: 12, width:12, position: 'absolute', backgroundColor: 'white',borderColor:'black',borderWidth:1, right: position, borderRadius: 100 }} />
        </LinearGradient>
    )
}