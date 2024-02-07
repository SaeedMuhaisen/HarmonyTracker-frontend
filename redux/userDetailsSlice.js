import { createSlice } from '@reduxjs/toolkit';
export const userDetailsSlice = createSlice({
    name: 'userDetails',

    initialState: {
        gender: '',
        birthDate: 1262350800000,
        weightI: 70,
        weightF: 0,
        weightUnit: 'kg',
        height: 170,
        heightI: 5,
        heightF: 8,
        heightUnit: 'cm'
    },

    reducers: {
        updateGender: (state, action) => { state.gender = action.payload },
        updateBirthDate: (state, action) => { state.birthDate = action.payload.birthDate },
        updateWeightI: (state, action) => { state.weightI = action.payload.weightI },
        updateWeightF: (state, action) => { state.weightF = action.payload.weightF },
        updateWeightUnit: (state, action) => { state.weightUnit = action.payload.weightUnit },
        updateHeight: (state, action) => { state.height = action.payload },
        updateHeightI: (state, action) => { state.heightI = action.payload },
        updateHeightF: (state, action) => { state.heightF = action.payload },
        updateHeightUnit: (state, action) => { state.heightUnit = action.payload },
    }
})

export const {
    updateBirthDate,
    updateWeightI,
    updateWeightF,
    updateWeightUnit,
    updateHeight,
    updateHeightI,
    updateHeightF,
    updateGender,
    updateHeightUnit } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;