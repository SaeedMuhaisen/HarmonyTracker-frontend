import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../GlobalStyles";
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Entypo } from '@expo/vector-icons';


function CustomHeader({ title, goBackEnabled = true, children }) {

    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <View style={{}} >
                <TouchableWithoutFeedback style={{ flexDirection: 'row' }} onPress={goBack} >
                    <Ionicons name="chevron-back" size={40} color='#DE4835' />
                    <Text style={{ alignSelf: 'center', color: '#DE4835', fontSize: 18 }}>Back</Text>
                </TouchableWithoutFeedback>
            </View>
            <TouchableWithoutFeedback style={{ paddingHorizontal: 10 }} onPress={()=>console.log("hello")}>
                <Entypo name="dots-three-horizontal" size={25} color='#DE4835' />
            </TouchableWithoutFeedback>
        </View>
    );
}
export default CustomHeader;