import React, { useState, memo, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { VictoryAxis, VictoryChart, VictoryLine, VictoryScatter, VictoryTheme } from "victory-native";
import { monthNames, monthNamesShort } from "../Consts/MonthNames";
import { current } from "@reduxjs/toolkit";
import { AppColors } from "../Styles/AppColors";
import { globalStyles } from "../GlobalStyles";


const Graph = memo(({ deficit, initialWeight, height, bmi, bodyFat }) => {
    const [data, setData] = useState({})
    const [data2, setData2] = useState({})
    const [goals, setGoals] = useState({});

    useEffect(() => {
        
        const generateGoals = () => {
            const thresholds = [40, 37, 35, 32, 30, 27, 25, 22, 20, 18, 15];
            const goals = [];

            thresholds.forEach(threshold => {
                if (bmi > threshold) {
                    const weight = (threshold * (height / 100) ** 2).toFixed(2);
                    goals.push({ value: parseFloat(weight), text: `BMI \n${threshold}` });

                }
            });

            return goals;
        }
        setGoals(generateGoals)
    }, [bmi])
    useEffect(() => {
        const generateGoals = (array) => {
            let data2Array = []
            for (let i = 0; i < array.length; i++) {
                if (array[i].goal) {
                    data2Array.push({ x: array[i].x, y: array[i].y })
                }
            }

            return data2Array
        }
        const generateArray = () => {
            let currentValue = initialWeight;
            let array = [];
            let flipper = 0;
            let goalIteration = 0;
            let dietBreak = 0;
            let wall = 0;
            let initW = initialWeight;
            for (let i = 0; i <= 10; i++) {
                dietBreak = dietBreak + 1;
                if (goalIteration < goals.length && Math.round(currentValue * 100) / 100 < goals[goalIteration].value) {
                    array.push({ x: monthNamesShort[i].y, y: Math.round(currentValue * 100) / 100, goal: true, goalText: goals[goalIteration].text });
                    goalIteration = goalIteration + 1;

                }
                else if (initW > currentValue - 0.3) {
                    flipper++;
                    let rand = deficit / 4

                    if (flipper % 2 === 0) {
                        array.push({ x: monthNamesShort[i].y, y: Math.round(currentValue * 100) / 100 + rand, goal: false });

                    } else {
                        array.push({ x: monthNamesShort[i].y, y: Math.round(currentValue * 100) / 100 - rand, goal: false });

                    }
                    initW = currentValue
                }
                else {
                    array.push({ x: monthNamesShort[i].y, y: Math.round(currentValue * 100) / 100, goal: false });

                }
                currentValue = Math.round((currentValue - deficit) * 100) / 100;
            }
            setData2(generateGoals(array))
            
            return array;
        };

        setData(generateArray)
    }, [deficit])
    const [width, setWidth] = useState(null);
    return (
        <View onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
            {width !== null && data !== null &&
                <View >

                    <VictoryChart
                        padding={40}
                        width={width + 30}
                        maxDomain={{ y: initialWeight + 10 }}
                        minDomain={{ y: initialWeight - 30 }}

                    >
                        <VictoryAxis style={{
                            tickLabels: {
                                fill: 'black',
                            },
                            grid: {
                                stroke: 'transparent', //CHANGE COLOR OF Y-AXIS GRID LINES
                                strokeDasharray: '3',
                            },
                            axis: {
                                stroke: 'gray'
                            }
                        }} />
                        <VictoryAxis dependentAxis

                            style={{
                                tickLabels: {
                                    fill: 'black',

                                },
                                grid: {
                                    stroke: 'gray', //CHANGE COLOR OF Y-AXIS GRID LINES
                                    strokeDasharray: '2',
                                },
                                axis: {
                                    stroke: 'black'
                                }
                            }}
                            tickFormat={(t) => `${t}kg`}

                        />
                        <VictoryLine
                            interpolation="natural"
                            style={{
                                data: { stroke: "#c43a31", strokeWidth: 2, strokeLinecap: 'round' },
                                parent: { border: "1px solid #ccc" },
                                labels: {
                                    fontSize: 10,
                                    fill: 'black',

                                },

                            }}

                            data={[
                                ...data,
                            ]}
                            labels={({ datum }) => datum.goalText}
                        />


                        <VictoryScatter data={[...data2]}
                            size={4}
                            style={{
                                data: { fill: "#c43a31" },
                                labels: {
                                    fontSize: 10,
                                    fill: 'tomato',
                                }
                            }}
                        />
                    </VictoryChart>
                </View>

            }

        </View >
    )
});

export default Graph;