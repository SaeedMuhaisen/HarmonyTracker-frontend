import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import PieChart from "../../PieChart";
import { VictoryPie, VictoryLabel } from "victory-native";
import { Svg } from "react-native-svg";
import { AppColors } from "../../../Styles/AppColors";
import { globalStyles } from "../../../GlobalStyles";
import store from "../../../redux/store";
import { useSelector } from "react-redux";
import { setCalories, setCarbs, setFat, setProtein } from "../../../redux/dailyIntakeSlice";


export default function () {
    const [width, setWidth] = useState(null)
    const [data, setData] = useState({})
    const [colors, setColors] = useState({})
    const takenMacros = useSelector(state => state.dailyIntake)
    const macros = useSelector(state => state.macros)
    const takenCalories = useSelector(state => state.dailyIntake.calories)
    const calories = useSelector(state => state.macros.calories)
    store.dispatch(setFat(0))
    useEffect(() => {
        const updateData = () => {
            console.log('macros:', macros)
            console.log('takenMacros:', takenMacros)
        
            const array = []
            const colorArray = []
            let rest = 0
            let protein = 0;
            let fat = 0;
            let carbs = 0;
            if (takenMacros.protein > 0) {
                console.log('!')
                rest = rest + takenMacros.protein
                protein = macros.protein - takenMacros.protein
            } else {
                protein = macros.protein;
            }
            if (takenMacros.fat > 0) {
                console.log('!')
                rest = rest + takenMacros.fat
                fat = macros.fat - takenMacros.fat
            } else {
                fat = macros.fat;
            }
            if (takenMacros.carbs > 0) {
                console.log('!')
                rest = rest + takenMacros.carbs
                carbs = macros.carbs - takenMacros.carbs
            } else {
                carbs = macros.carbs;
            }


            if (rest > 0) {
                console.log('rest',rest)
                array.push({ y: rest })
                colorArray.push('gray')
            }
            if (protein > 0) {
                console.log('protein',protein)
                array.push({ y: protein })
                colorArray.push(AppColors.proteinColor)
            }
            if (carbs > 0) {
                console.log('carbs',carbs)
                array.push({ y: carbs })
                colorArray.push(AppColors.carbsColor)
            }
            if (fat > 0) {
                console.log('fat',fat)

                array.push({ y: fat * 9/4 })
                colorArray.push(AppColors.fatColor)
            }


            setData(array)
            setColors(colorArray)

        }
        updateData()

    }, [takenMacros])

    return (


        <View style={{ justifyContent: 'center', alignItems: 'center' }} onLayout={(event) => setWidth(event.nativeEvent.layout.width > 250 ? 250 : event.nativeEvent.layout.width)}>
            {width !== null && data !== null &&
                <>
                    < VictoryPie
                        padAngle={3}
                        labelComponent={null}
                        radius={width / 2}
                        innerRadius={width / 2 - 10}
                        height={width}
                        width={width}
                        data={[
                            ...data
                        ]}
                        padding={0}
                        colorScale={[...colors]}

                        cornerRadius={100}
                    >

                    </VictoryPie>

                    <View style={{ justifyContent: 'center', alignItems: 'center', position: "absolute", width: width, height: width }}>
                        <Text style={{ ...globalStyles.title, fontSize: 30 }}>
                            {Math.round(calories - takenCalories).toLocaleString()}
                        </Text>
                        <Text style={{ ...globalStyles.description }}>Calories Left</Text>
                    </View>
                </>
            }
        </View >


    );
}