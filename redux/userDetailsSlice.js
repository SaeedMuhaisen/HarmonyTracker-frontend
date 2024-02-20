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
        heightUnit: 'cm',
        extraData: true,
        waistNarrowest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        waistNavel: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        hipWidest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        thighWidest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        neckNarrowest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        bicepsWidest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        forearmWidest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },
        wristNarrowest: {
            first: 60,
            last: 0,
            unit: 'cm',
        },


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
        updateExtraData: (state, action) => { state.extraData = action.payload },

        updateWaistNarrowest: (state, action) => { state.waistNarrowest = { ...state.waistNarrowest, ...action.payload } },
        updateWaistNavel: (state, action) => { state.waistNavel = { ...state.waistNavel, ...action.payload } },
        updateHipWidest: (state, action) => { state.hipWidest = { ...state.hipWidest, ...action.payload } },
        updateThighWidest: (state, action) => { state.thighWidest = { ...state.thighWidest, ...action.payload } },
        updateNeckNarrowest: (state, action) => { state.neckNarrowest = { ...state.neckNarrowest, ...action.payload } },
        updateBicepsWidest: (state, action) => { state.bicepsWidest = { ...state.bicepsWidest, ...action.payload } },
        updateForearmWidest: (state, action) => { state.forearmWidest = { ...state.forearmWidest, ...action.payload } },
        updateWristNarrowest: (state, action) => { state.wristNarrowest = { ...state.wristNarrowest, ...action.payload } },
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
    updateHeightUnit,
    updateExtraData,
    
    updateWaistNarrowest,
    updateWaistNavel,
    updateHipWidest,
    updateThighWidest,
    updateNeckNarrowest,
    updateBicepsWidest,
    updateForearmWidest,
    updateWristNarrowest,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;