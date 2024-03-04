import { createSlice } from '@reduxjs/toolkit';
export const userDetailsSlice = createSlice({
    name: 'userDetails',

    initialState: {
        gender: 'male',
        birthDate: 1262350800000,
        preferredUnit: 'cm',
        preferredWeightUnit: 'kg',

        height: 170,
        weight: 100,

        extraData: false,
        waistNarrowest: 50.0,
        waistNavel: 60.0,
        hipWidest: 70.0,
        thighWidest: 80.0,
        neckNarrowest: 90.0,
        bicepsWidest: 100.0,
        forearmWidest: 200.0,
        wristNarrowest: 300.0,
        activityLevel:1.2,
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