import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import Slider from "@react-native-community/slider";
import { globalStyles } from "../../GlobalStyles";

import constricted_activity from '../../assets/activityLevels/constricted_activity.png'
import extremelyActive_activity from '../../assets/activityLevels/extremelyActive_activity.png'
import home_activity from '../../assets/activityLevels/home_activity.png'
import lightlyActive_activity from '../../assets/activityLevels/lightlyActive_activity.png'
import moderatelyActive_activity from '../../assets/activityLevels/moderatelyActive_activity.png'
import sedentary_activity from '../../assets/activityLevels/sedentary_activity.png'
import slightlyActive_activity from '../../assets/activityLevels/slightlyActive_activity.png'
import veryActive_activity from '../../assets/activityLevels/veryActive_activity.png'

const ScrollQuestion = React.memo(({ element, handleAnswerSelection, pressedItem }) => {

    const [scroll, setScroll] = useState(0);
    const dispatch = useDispatch();
    const answers = element.answers
    const bodyDetails = useSelector(state => state.bodyDetails);
    const pictures = element.pictures
    useEffect(() => {

    }, [scroll])

    return (


        <View style={{ backgroundColor: 'transparent', flex: 1, paddingHorizontal: 10 }}>
            <View style={{ flex: 2, gap: 10, }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                    <Image source={scroll == null ? pictures[0] : pictures[scroll]} style={{ width: 200, height: 200 }} />

                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ borderRadius: 20, backgroundColor: 'white', padding: 10 }}>
                        <Text>Minimum</Text>
                    </View>
                    <View style={{ borderRadius: 50, backgroundColor: 'white', padding: 10 }}>
                        <Text>Extreme</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, }}>
                <Slider maximumValue={element.answers.length - 1} minimumValue={0} step={1} onValueChange={
                    (value) => {
                        setScroll(value)
                    }
                }
                    onSlidingComplete={() => {
                        dispatch(element.update(answers[scroll].val))
                        handleAnswerSelection(answers[scroll])
                    }}

                />
                <View style={{ padding: 10, gap: 5, }}>
                    <Text style={{ ...globalStyles.description, fontSize: 20, textAlign: 'center' }}>{answers[scroll].title}</Text>
                    <Text style={{ ...globalStyles.body, textAlign: 'center' }}>{answers[scroll].name}</Text>
                </View>
            </View>
        </View>
    )

});
export default ScrollQuestion;