import React from "react";
import { StyleSheet } from "react-native";
import { AppColors } from "./Styles/AppColors";

export const globalStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: AppColors.textColor
  },
  description: {
    color: AppColors.textColor,
    fontSize: 15,
    fontWeight:'600'
  },
  body: {
    color: AppColors.textColor,
    fontSize: 15,
    fontWeight:'normal'
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
  },
  showdedCard: {
    backgroundColor: AppColors.cardBackground,
    padding: 15,
    gap: 5,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    color: AppColors.textColor,
    elevation: 6,
  }
});