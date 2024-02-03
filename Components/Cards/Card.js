import React from "react";
import { View } from "react-native";
import { logoStyles } from "../../Styles/LogoStyles";
import { StyleSheet } from "react-native";
import { AppColors } from "../../Styles/AppColors";
export default function ({ children }) {
    return (
        
            <View style={styles.card}>
                {children}
            </View>
        
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: AppColors.cardBackground,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        gap: 5,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
}
);