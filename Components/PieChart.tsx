import React from "react";
import { View, Text } from "react-native";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
export default function PieChart({ y,max, baseColor, secondaryColor }) {
    
    return (
        <Svg width={100} height={100}>
            <VictoryPie

                padAngle={0}
                // used to hide labels
                labelComponent={null}
                innerRadius={40}
                width={100}
                height={100}
                data={[
                    { key: "", y: y },
                    { key: "", y: max - y },
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
                style={[{ fontSize: 35, color: '#28323B', fontWeight: '600', lineHeight: 40 }, { fontWeight: '600', fontSize: 16 }]}
                x={100 * 0.5} y={100 * 0.5}
                text={ max-y }
                
            />


        </Svg>
    );
}