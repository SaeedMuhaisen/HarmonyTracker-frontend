import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import { AppColors } from "../../Styles/AppColors";
export default function ({ bmi, weight, height }) {
    const [goals, setGoals] = useState(null)

    useEffect(() => {
        
        const generateGoals = () => {
            const thresholds = [40, 37, 35, 32, 30, 27, 25, 22, 20, 18,];
            const goals = [];

            thresholds.forEach(threshold => {
                if (bmi > threshold) {
                    const weight = (threshold * (height / 100) ** 2).toFixed(2);
                    goals.push({ weight: parseFloat(weight), bmi: threshold });
                }
            });
            
            return goals;
        }
        setGoals(generateGoals)
    }, [bmi])

    return (
        <View>
            <View>
                {goals !== null &&
                    <Text style={{ ...globalStyles.body }}>You have {goals.length} BMI Goals</Text>
                }
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: 75 }}>
                    <View style={{ paddingVertical: 5, flex: 1, }}>
                        <Text></Text>
                        <Text style={{ ...globalStyles.title, }}>BMI</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ ...globalStyles.body, }}>Weight</Text>
                    </View>
                </View>
                <ScrollView horizontal contentContainerStyle={{ gap: 20, }} showsHorizontalScrollIndicator={false}>
                    {goals !== null &&
                        goals.map((goal, index) => (
                            <View key={index} style={{ backgroundColor: index === 0 ? AppColors.proteinColor : 'gray', borderRadius: 10, width: 75 }}>
                                <View style={{ paddingVertical: 5, flex: 1, }}>
                                    <Text style={{ ...globalStyles.title, textAlign: 'center', color: 'white', fontSize: 9, }}>{index === 0 ? '1st Goal' : index + 1}</Text>
                                    <Text style={{ ...globalStyles.title, textAlign: 'center', color: 'white', }}>{goal.bmi}</Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: index === 0 ? 'tomato' : 'darkgray', }}>
                                    <Text style={{ ...globalStyles.body, textAlign: 'center', color: 'white', }}>{Math.round(goal.weight)} KG</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView >
            </View>
        </View >
    )
}