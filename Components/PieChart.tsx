import React from "react";
import { View, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
import { AppColors } from "../Styles/AppColors";
import App from "../App";
export default function PieChart({ y, max, baseColor, secondaryColor }) {

    return (
        <Svg width={75} height={75}>
            <VictoryPie
                padAngle={0}
                labelComponent={null}
                innerRadius={34}

                width={75}
                height={75}
                data={[
                    { key: "", y: y },
                    { key: "", y: max - y },
                ]}
                padding={0}
                colorScale={[AppColors.primaryYellow, AppColors.SecondaryYellow]}
                animate={{
                    duration: 2000
                }}
            >
            </VictoryPie>
            <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                style={[
                    { fontSize: 20, fill:AppColors.textColor, fontWeight: '600', lineHeight: 40 },
                    { fontWeight: '300', fontSize: 14,color: 'white' ,fill:AppColors.textColor}]}
                x={75 * 0.5} y={75 * 0.55}
                text={max - y + '\n/' + max + 'g'}

            />
        </Svg>
    );
}