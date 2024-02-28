import React from "react";
import { View } from "react-native";

import { LinearGradient } from 'expo-linear-gradient';

export default function ({ outerPaddingSize, pointerPos }) {
    const position = Math.round((pointerPos - 18) / 17 * 100);

    console.log(position)
    return (
        <LinearGradient
            colors={['rgba(255,247,119,1)', 'rgba(255,247,119,1)', 'rgba(176,229,82,1)', 'rgba(176,229,82,1)', 'rgba(244,168,52,1)', 'rgba(244,168,52,1)', 'rgba(231,62,53,1)', 'rgba(193,32,48,1)']}
            locations={[0, 0.25, 0.25, 0.5, 0.5, 0.75, 0.75, 1]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ height: 12, borderRadius: 20, position: 'relative', paddingHorizontal: outerPaddingSize / 2 }}
        >
            <View style={{
                height: 12,
                width: 12,
                position: 'absolute',
                backgroundColor: 'white',
                borderColor: 'black',
                borderWidth: 1,
                left: position <= 50 ? `${position}%` : undefined,
                right: position > 50 ? `${(position - 100) * -1}%` : undefined, borderRadius: 100
            }} 
            />
        </LinearGradient>
    )
}