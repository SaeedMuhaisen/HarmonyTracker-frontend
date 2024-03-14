import React from "react";
import { View, Text } from "react-native";
import PieChartLarge from "../../PieChartLarge";
import PieChart from "../../PieChart";
import store from "../../../redux/store";
import { AppColors } from "../../../Styles/AppColors";

export default function () {
    const macros = store.getState().macros;
    return (

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
            <View style={{ alignItems: 'center' }}>
                <PieChart y={100} max={Math.round(macros.calories)} baseColor={'#DE4835'} secondaryColor={'gray'} />
                <Text style={{color:AppColors.textColor}}>Calories</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <PieChart y={23} max={macros.carbs} baseColor={'#DE4835'} secondaryColor={'gray'} />
                <Text style={{color:AppColors.textColor}}>Carbs</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <PieChart y={20} max={macros.fat} baseColor={'#DE4835'} secondaryColor={'gray'} />
                <Text style={{color:AppColors.textColor}}>Fat</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
                <PieChart y={100} max={macros.protein} baseColor={'#DE4835'} secondaryColor={'gray'} />
                <Text style={{color:AppColors.textColor}}>Protein</Text>
            </View>
        </View>

    );
}