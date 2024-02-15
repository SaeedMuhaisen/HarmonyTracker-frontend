import React from "react";
import { StyleSheet } from "react-native";
import { AppColors } from "./Styles/AppColors";

export const globalStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  H4: {
    fontSize: 24, 
    fontWeight: '800',
     color: AppColors.textColor
  },
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
});5