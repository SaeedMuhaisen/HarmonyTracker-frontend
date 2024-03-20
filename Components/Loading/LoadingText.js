import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';
import { globalStyles } from '../../GlobalStyles';

export default function ({ textList }) {
    const [index, setIndex] = useState(0);
    const fadeAnim = useState(new Animated.Value(0))[0];

    const fadeInOut = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useEffect(() => {
        fadeInOut();
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % textList.length);
            fadeInOut();
        }, 2000); // Adjust this value according to your requirement
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Animated.Text
                style={{
                    opacity: fadeAnim,
                    ...globalStyles.body
                }} >
                {textList[index]}
            </Animated.Text>
        </View>
    );
}