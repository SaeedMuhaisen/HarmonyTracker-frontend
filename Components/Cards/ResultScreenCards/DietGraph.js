import React, { useState, memo, useEffect } from "react";
import { View, Text, } from "react-native";
import { AppColors } from "../../../Styles/AppColors";
import {
    LineChart,

} from "react-native-chart-kit";
import { globalStyles } from "../../../GlobalStyles";
import { useSelector } from "react-redux";
function* yLabel() {
    yield* [1, 2, 3, 4, 5, 6];
}

const DietGraph = memo(({ deficit, initialWeight, height, bmi, bodyFat }) => {
    console.log(deficit)
    const roadMap = [];
    const goals = [];
    const [data, setData] = useState({})
    const yLabelIterator = yLabel();

    useEffect(() => {
        const generateArray = () => {
            console.log(initialWeight, 'initial weight')
            let currentValue = initialWeight;
            let array = [];

            let iterations = 0;
            let dietBreak = 0;
            let wall = 0;
            while (iterations <= 16) {
                if (dietBreak === 5) {
                    array.push(Math.round(currentValue * 100) / 100)
                    iterations = iterations + 1;
                    dietBreak = 0;
                }

                else {
                    if (wall === 7) {
                        iterations = iterations + 1;
                        currentValue = Math.round((currentValue + deficit) * 100) / 100;
                        wall = 0;
                    }
                    else {
                        dietBreak = dietBreak + 1;
                        wall += 1
                        array.push(Math.round(currentValue * 100) / 100);

                        currentValue = Math.round((currentValue - deficit) * 100) / 100;
                        console.log(Math.round((currentValue - deficit) * 100), 'val')
                        console.log(deficit, 'vals')
                        iterations = iterations + 1;
                    }
                }
            }
            console.log(array)
            return array;
        };
        setData(generateArray)
    }, [deficit])
    const [width, setWidth] = useState(null);
    console.log(width !== null ? width : 'null')
    return (
        <View style={{}} onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
            <Text style={{ color: 'white' }}>To lose {Math.round(bodyFat)}</Text>
            {width !== null && data !== null &&
                <LineChart
                    // fromNumber={initialWeight + 6}
                    bezier
                    data={{
                        labels: [1, 10, 20, 30, 50],


                        datasets: [
                            {
                                data: data,
                                withDots: false,
                                strokeWidth: 1
                            },
                            {
                                data: [initialWeight - 15], // Set Min
                                withDots: false, // Hide Dots
                            },
                            {
                                data: [initialWeight + 15], // Set Max
                                withDots: false, // Hide Dots
                            },
                        ]
                    }

                    }
                    width={width} // from react-native
                    height={width / 2}

                    yAxisSuffix="kg"
                    yAxisInterval={1} // optional, defaults to 1
                    segments={4}
                    chartConfig={{
                        backgroundGradientFrom: AppColors.cardBackground,
                        backgroundGradientTo: AppColors.cardBackground,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `white`,
                        //labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `white`,


                    }}
                    withVerticalLines={false}
                    withHorizontalLines={false}


                />
            }
        </View>
    );
}
);

export default DietGraph;


