import React, { useState } from "react";
import { View, Text,StyleSheet } from "react-native";

export default function () {
    const [width, setWidth] = useState();
    return (
        <View onLayout={(event) => { setWidth(event.nativeEvent.layout.width) }}>
            {width !== null &&
                <View style={{ marginTop: 100 }}>
                   
                    <View style={styles.curvedLine} />
                </View>

            }

        </View>
    )
}

const styles = StyleSheet.create({

    curvedLine: {
        width: 10,
        height:100,

        bottom: 25,
        left: 100,
        
        backgroundColor: "white",
        transform: [{ scaleX:5 }, { scaleY: 1 }],
    },
});