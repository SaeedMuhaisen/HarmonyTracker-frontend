import { createSlice } from '@reduxjs/toolkit';
export const userDetailsSlice = createSlice({
    name: 'userDetails',

    initialState: {
        gender: "male",
        birthDate: 860932800000,
        preferredUnit: 'cm',
        preferredWeightUnit: 'kg',

        height: 173,
        weight: 83,

        extraData: true,
        waistNarrowest: 95.5,
        waistNavel: 96.5,
        hipWidest: 105,
        thighWidest: 59.5,
        neckNarrowest: 39.8,
        bicepsWidest: 32.5,
        forearmWidest: 26.5,
        wristNarrowest: 15.5,
        activityLevel:1.1,
    },

    reducers: {
        updateGender: (state, action) => { state.gender = action.payload },
        updateBirthDate: (state, action) => { state.birthDate = action.payload.birthDate },

        updatePreferedUnit: (state, action) => { state.preferredUnit = action.payload },
        updatePreferedWeightUnit: (state, action) => { state.preferredWeightUnit = action.payload },

        updateWeight: (state, action) => { state.weight = action.payload },
        updateHeight: (state, action) => { state.height = action.payload },

        updateExtraData: (state, action) => { state.extraData = action.payload },
        updateWaistNarrowest: (state, action) => { state.waistNarrowest = action.payload },
        updateWaistNavel: (state, action) => { state.waistNavel = action.payload },
        updateHipWidest: (state, action) => { state.hipWidest = action.payload },
        updateThighWidest: (state, action) => { state.thighWidest = action.payload },
        updateNeckNarrowest: (state, action) => { state.neckNarrowest = action.payload },
        updateBicepsWidest: (state, action) => { state.bicepsWidest = action.payload },
        updateForearmWidest: (state, action) => { state.forearmWidest = action.payload },
        updateWristNarrowest: (state, action) => { state.wristNarrowest = action.payload },

        updateActivityLevel: (state, action) => { state.activityLevel = action.payload },

    }
})

export const {
    updateGender,
    updateBirthDate,
    
    updatePreferedUnit,
    updatePreferedWeightUnit,
    
    updateHeight,  
    updateWeight,

    updateExtraData,
    updateWaistNarrowest,
    updateWaistNavel,
    updateHipWidest,
    updateThighWidest,
    updateNeckNarrowest,
    updateBicepsWidest,
    updateForearmWidest,
    updateWristNarrowest,

    updateActivityLevel,
} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;