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
        extraData: false,
        waistNarrowest: 20.0,
        waistNavel: 20,
        hipWidest: 20,
        thighWidest: 20,
        neckNarrowest: 20,
        bicepsWidest: 20,
        forearmWidest: 20,
        wristNarrowest: 20.0,
        waistNarrowestUnit: 'cm',
        waistNavelUnit: 'cm',
        hipWidestUnit: 'cm',
        thighWidestUnit: 'cm',
        neckNarrowestUnit: 'cm',
        bicepsWidestUnit: 'cm',
        forearmWidestUnit: 'cm',
        wristNarrowestUnit: 'cm',

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

        updateWaistNarrowest: (state, action) => { state.waistNarrowest = action.payload},
        updateWaistNavel: (state, action) => { state.waistNavel = action.payload },
        updateHipWidest: (state, action) => { state.hipWidest = action.payload },
        updateThighWidest: (state, action) => { state.thighWidest = action.payload },
        updateNeckNarrowest: (state, action) => { state.neckNarrowest = action.payload },
        updateBicepsWidest: (state, action) => { state.bicepsWidest = action.payload },
        updateForearmWidest: (state, action) => { state.forearmWidest = action.payload },
        updateWristNarrowest: (state, action) => { state.wristNarrowest = action.payload },

        updateWaistNarrowestUnit: (state, action) => {
            state.waistNarrowestUnit = action.payload;
            if(action.payload==='cm'){
                state.waistNarrowest=25;
            }
            else{
                state.waistNarrowest=11;
            }
        },
        updateWaistNavelUnit: (state, action) => { state.waistNavelUnit = action.payload },
        updateHipWidestUnit: (state, action) => { state.hipWidestUnit = action.payload },
        updateThighWidestUnit: (state, action) => { state.thighWidestUnit = action.payload },
        updateNeckNarrowestUnit: (state, action) => { state.neckNarrowestUnit = action.payload },
        updateBicepsWidestUnit: (state, action) => { state.bicepsWidestUnit = action.payload },
        updateForearmWidestUnit: (state, action) => { state.forearmWidestUnit = action.payload },
        updateWristNarrowestUnit: (state, action) => { state.wristNarrowestUnit = action.payload },
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
    updateWaistNarrowestUnit,
    updateWaistNavelUnit,
    updateHipWidestUnit,
    updateThighWidestUnit,
    updateNeckNarrowestUnit,
    updateBicepsWidestUnit,
    updateForearmWidestUnit,
    updateWristNarrowestUnit,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;