import { createSlice } from '@reduxjs/toolkit';

export const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState: {
    data: {
      bmi: null,
      bmiClassificationType: null,
      bodyFatPercentage: null,
      bfpType:null,
      bodyFatMass: null,
      bodyFatMassClassificationType:null,
      leanBodyMass: null,
      bmr:null,
      bmrType:null,
      
    },
  },
  reducers: {
    setResult: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setResult } = surveyResultSlice.actions;
export default surveyResultSlice.reducer;