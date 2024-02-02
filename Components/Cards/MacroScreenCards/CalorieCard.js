import React from "react";
import { View, Text } from "react-native";
import PieChartLarge from "../../PieChartLarge";
import PieChart from "../../PieChart";
import store from "../../../redux/store";

export default function () {
    const macros=store.getState().macros;
    return (
        <View style={{  gap: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                <PieChartLarge y={100} max={macros.calories} baseColor={'#DE4835'} secondaryColor={'gray'} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                <View style={{ alignItems: 'center' }}>
                    <PieChart y={23} max={macros.carbs} baseColor={'#DE4835'} secondaryColor={'gray'} />
                    <Text>Carbs</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <PieChart y={20} max={macros.fat} baseColor={'#DE4835'} secondaryColor={'gray'} />
                    <Text>Fat</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <PieChart y={100} max={macros.protein} baseColor={'#DE4835'} secondaryColor={'gray'} />
                    <Text>Protein</Text>
                </View>
            </View>

        </View>
    );
}