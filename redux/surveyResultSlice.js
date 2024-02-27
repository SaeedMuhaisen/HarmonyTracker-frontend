import { createSlice } from '@reduxjs/toolkit';

export const surveyResultSlice = createSlice({
  name: 'surveyResult',
  initialState: {
    data: {
      bmi: null,
      bodyFatPercentage: null,
      bmiClassificationType: null,
      leanBodyMass: null,
      bodyFatMass: null,
      bmrMSJ: null,
      bmrRHE: null,
      bmrKMA: null,
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