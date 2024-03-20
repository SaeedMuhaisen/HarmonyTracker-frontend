import React from "react";
import { StyleSheet } from "react-native";
import { AppColors } from "./Styles/AppColors";
import {
  useFonts,
  Manrope_200ExtraLight,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
export const globalStyles = StyleSheet.create({
  signUpInputContainer: {
    flexDirection:'row',
    gap:10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: AppColors.stackBackground,
    padding: 12,
    paddingVertical:15,
    color: AppColors.textColor

  },
  signUpInput: {
    flex:1,
    fontSize: 18,
    color: AppColors.textColor
  },
  SafeAreaContainer: {

  },
  outerContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Manrope_800ExtraBold',
    fontSize: 20,
    color: AppColors.textColor
  },
  description: {
    fontFamily: 'Manrope_700Bold',
    color: AppColors.textColor,
    fontSize: 18,

  },
  body: {
    fontFamily: 'Manrope_400Regular',
    color: AppColors.textColor,
    fontSize: 16,
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
  },
});