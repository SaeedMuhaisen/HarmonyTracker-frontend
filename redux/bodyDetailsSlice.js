import { createSlice } from '@reduxjs/toolkit';
export const bodyDetailsSlice = createSlice({
    name: 'bodyDetails',

    initialState: {
        gender: "male",
        birthDate: 860932800000,
        preferredUnit: 'cm',
        height: 173,
        preferredWeightUnit: 'kg',
        weight: 83,

        extraData: true,
        neckNarrowest: 39.8,
        waistNavel: 96.5,
        hipWidest: 105,

        activityLevel: 1.1,
        goal: 0,
    },

    reducers: {
        updateGender: (state, action) => { state.gender = action.payload },
        updateBirthDate: (state, action) => { state.birthDate = action.payload.birthDate },

        updatePreferedUnit: (state, action) => { state.preferredUnit = action.payload },
        updateHeight: (state, action) => { state.height = action.payload },
        updatePreferedWeightUnit: (state, action) => { state.preferredWeightUnit = action.payload },
        updateWeight: (state, action) => { state.weight = action.payload },
        
        updateExtraData: (state, action) => { state.extraData = action.payload },
        updateNeckNarrowest: (state, action) => { state.neckNarrowest = action.payload },
        updateWaistNavel: (state, action) => { state.waistNavel = action.payload },
        updateHipWidest: (state, action) => { state.hipWidest = action.payload },
    
        updateActivityLevel: (state, action) => { state.activityLevel = action.payload },
        updateGoal: (state, action) => { state.goal = action.payload },

    }
})

export const {
    updateGender,
    updateBirthDate,

    updatePreferedUnit,
    updateHeight,
    updatePreferedWeightUnit,
    updateWeight,
    
    updateExtraData,
    updateNeckNarrowest,
    updateWaistNavel,
    updateHipWidest,

    updateActivityLevel,
    updateGoal,
} = bodyDetailsSlice.actions;
export default bodyDetailsSlice.reducer;