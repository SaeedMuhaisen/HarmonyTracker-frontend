import React from "react";
import { View, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";

export default function PieChartLarge({ y, baseColor, secondaryColor }) {
    
    return (
        <Svg width={150} height={150}>
            <VictoryPie

                padAngle={0}
                // used to hide labels
                labelComponent={null}
                innerRadius={68}
                width={150}
                height={150}
                data={[
                    { key: "", y: y },
                    { key: "", y: 1500 - y },
                ]}
                padding={0}
                colorScale={[baseColor, secondaryColor]}
                animate={{
                    duration: 2000
                }}
            >
            </VictoryPie>
            <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                style={[{ fontSize: 20, color: '#28323B', fontWeight: '600', lineHeight: 40 }, { fontWeight: '600', fontSize: 14 }]}
                x={150 * 0.5} y={150 * 0.5}
                text={1500-y + '\nRemaining Calories'}
                
            />


        </Svg>
    );
}