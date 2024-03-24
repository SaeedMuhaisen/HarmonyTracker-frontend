import { createSlice } from '@reduxjs/toolkit';

export const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState: {
    bmi: null,
    bmiClassificationType: null,

    bodyFatPercentage: null,
    bfpType: null,

    bodyFatMass: null,
    bodyFatMassClassificationType: null,

    leanBodyMass: null,
    bmr: null,
    bmrType: null,
  },

  reducers: {
    setResult: (state, action) => {
      const {
        bmi,
        bmiClassificationType,
        bodyFatPercentage,
        bfpType,
        bodyFatMass,
        bodyFatMassClassificationType,
        leanBodyMass,
        bmr,
        bmrType,
      } = action.payload;
      state.bmi = bmi;
      state.bmiClassificationType = bmiClassificationType;
      state.bodyFatPercentage = bodyFatPercentage;
      state.bfpType = bfpType;
      state.bodyFatMass = bodyFatMass;
      state.bodyFatMassClassificationType = bodyFatMassClassificationType;
      state.leanBodyMass = leanBodyMass;
      state.bmr = bmr;
      state.bmrType = bmrType;
    },
  },
});

export const { setResult } = surveyResultSlice.actions;
export default surveyResultSlice.reducer;