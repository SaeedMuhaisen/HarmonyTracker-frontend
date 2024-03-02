import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { VictoryPie, VictoryLabel, VictoryTooltip } from "victory-native";
import { Svg } from "react-native-svg";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../GlobalStyles";
import { AppColors } from "../../../Styles/AppColors";
export default function ({ data, width }) {

    return (
        //         <View style={{height:(width/2),width:width,position:'relative'}}>
        // {/* 

        //             <View style={{ position: 'absolute'}} >
        //                 {
        //                     width !== null &&

        //                     < VictoryPie
        //                         style={{
        //                             data: {
        //                                 fillOpacity: 0.9, stroke: "#c43a31", strokeWidth: 3,
        //                             },
        //                             labels: {
        //                                 fill: "#c43a31", fontSize: globalStyles.body.fontSize, fill: 'white',
        //                             },

        //                         }}
        //                         width={width}
        //                         height={width}
        //                         padding={5}
        //                         labels={({ datum }) => `${datum.y}`}

        //                         labelPlacement={({ index }) => index ? 'parallel' : 'parallel'}
        //                         data={data}
        //                         labelPosition='centroid'
        //                         colorScale={[AppColors.SecondaryYellow, 'tomato']}
        //                         startAngle={-90}
        //                         endAngle={90}
        //                     >
        //                     </VictoryPie>
        //                 }
        //             </View > */}

        //         </View>
        <View>
            
        </View>
    );
}