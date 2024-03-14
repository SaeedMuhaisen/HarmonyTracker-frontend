import React, { useState } from "react";
import { View, Text } from "react-native";
import PieChart from "../../PieChart";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
import { AppColors } from "../../../Styles/AppColors";
import { globalStyles } from "../../../GlobalStyles";
export default function ({ carbs, fat, protein, calories }) {
    const [width, setWidth] = useState(null)
    return (


        <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => setWidth(event.nativeEvent.layout.width>250?250:event.nativeEvent.layout.width)}>
            {width !== null &&
                <>
                    < VictoryPie
                        padAngle={3}
                        labelComponent={null}
                        radius={width/2 }
                        innerRadius={width/2 - 10}
                        height={width}
                        width={width}
                        data={[
                            { y: (protein !== null ? protein * 4 : 1) },
                            { y: (carbs !== null ? carbs * 4  : 1) },
                            { y: (fat !== null ? fat * 9  : 1) },
                        ]}
                        padding={0}
                        colorScale={[AppColors.proteinColor, AppColors.carbsColor, AppColors.fatColor]}

                        cornerRadius={100}
                    >

                    </VictoryPie>

                    <View style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", width: width, height: width }}>
                        <Text style={{ ...globalStyles.title, fontSize: 30 }}>
                            {Math.round(calories) > 999
                                ?
                                `${Math.floor(calories / 1000)},${Math.floor((calories - (Math.floor(calories / 1000) * 1000)))}`
                                :
                                Math.round(calories)}
                        </Text>
                        <Text style={{ ...globalStyles.description }}>Calories/Day</Text>
                    </View>
                </>
            }
        </View >


    );
}