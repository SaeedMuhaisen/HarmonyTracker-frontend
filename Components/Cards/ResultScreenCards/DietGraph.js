import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { VictoryChart, VictoryClipContainer, VictoryLine, VictoryScatter, VictoryTheme } from "victory-native";
import { AppColors } from "../../../Styles/AppColors";
import { monthNames } from "../../../Consts/MonthNames";
import { FlatList } from "react-native-gesture-handler";

export default function ({ deficit, initialWeight, bmi, height }) {
    //Map based on bmi implementation
    const roadMap = [];
    const goals = [];
    useEffect(() => {
        const setUpGoals = () => {
            const thresholds = [35, 30, 25, 22.5, 20, 18];
            thresholds.forEach(threshold => {
                if (bmi > threshold) {
                    goals.push({ weight: Math.floor(threshold * height / 100 * height / 100), bmi: threshold });
                }
            });
            setUpRoadMap()
        }
        const setUpRoadMap = () => {
            const markedWeights = goals.map(goal => goal.weight);
            Array.from({ length: Math.ceil(initialWeight - goals[goals.length - 1].weight) }, (_, index) => {
                const myWeight = initialWeight - index;
                let mark = null;
                if (markedWeights.includes(myWeight)) {
                    mark = 'MARKED';
                } else if ((initialWeight - myWeight) % 5 === 0) {
                    mark = 'MILESTONE+MARKED';
                }
                roadMap.push({ myWeight, mark });
            });
        }
        setUpGoals();
    }, [])


    console.log(roadMap)
    const [width, setWidth] = useState(null);
    const date = new Date();

    return (
        <View style={{ backgroundColor: 'gray' }} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
            {/* {width !== null &&

                <VictoryChart
                    theme={VictoryTheme.grayscale}
                    width={width}
                    style={{

                    }}

                >
                    <VictoryLine
                        groupComponent={<VictoryClipContainer clipPadding={{ top: 5, right: 10 }} />}
                        style={{
                            data: { stroke: "#c43a31", },

                        }}
                        interpolation="natural"
                        data={[
                            { x: 'today', y: 89, },
                            { x: 'feb', y: 87, },
                            { x: 'march', y: 85, },
                            { x: 'april', y: 80, },
                        ]}

                    />
                    <VictoryScatter
                        style={{
                            parent: {
                                border: "1px solid #ccc"
                            },
                            data: {
                                fill: "#c43a31", fillOpacity: 0.6, stroke: "#c43a31", strokeWidth: 3
                            },
                            labels: {
                                fontSize: 15, fill: "#c43a31", padding: 15
                            }
                        }}
                        size={9}
                        data={[
                            { x: 'feb', y: 87, },

                        ]}
                        labels={({ datum }) => datum.x}
                    />

                </VictoryChart>
            } */}

            <Text>Goals:</Text>
            <Text>BMI: {bmi}</Text>
            {goals !== null && roadMap !== null &&
                <>
                    <FlatList
                        data={goals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text>
                                Reach {item.weight.toFixed(2)} kg (BMI: {item.bmi})
                            </Text>
                        )}
                    />
                    <FlatList
                        data={roadMap}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Text>
                                Reach {item.myWeight} kg {item.mark}
                            </Text>
                        )}
                    />
                </>
            }



        </View>
    )

}