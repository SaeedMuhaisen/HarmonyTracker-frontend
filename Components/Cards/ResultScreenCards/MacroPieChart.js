import React from "react";
import { View, Text } from "react-native";
import PieChart from "../../PieChart";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
import { AppColors } from "../../../Styles/AppColors";
import { globalStyles } from "../../../GlobalStyles";
export default function ({ title, value, unit, description, pieColor = AppColors.primaryYellow, cardColor, width }) {

    return (
        <View style={{ alignItems: 'center', gap: 5, backgroundColor: cardColor, borderRadius: 10, paddingTop: 5 }}>

            <View>
                <Text style={globalStyles.title}>{title}</Text>
            </View>
            <View>
                <VictoryPie
                    padAngle={0}
                    labelComponent={null}
                    innerRadius={width / 2 - 5}
                    width={width}
                    height={width}
                    data={[
                        { y: value },
                    ]}
                    padding={0}
                    colorScale={[pieColor, pieColor]}
                    animate={{
                        duration: 2000
                    }}
                >
                </VictoryPie>
                <View style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", width: width, height: width }}>
                    {/* <Text style={{ color: 'white', fontSize: 20, fill: AppColors.textColor, fontWeight: '600', textAlign: 'center' }}>{value}</Text>
                <Text style={{ fontWeight: '300', fontSize: 14, color: 'white', fill: AppColors.textColor, textAlign: 'center' }}>{unit}</Text> */}
                    <Text style={globalStyles.description}>{value}</Text>
                    <Text style={globalStyles.body}>{unit}</Text>
                </View>
            </View>
                <Text style={globalStyles.body}>{description}</Text>


        </View>
    );
}