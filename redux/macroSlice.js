import { createSlice } from '@reduxjs/toolkit';

export const macroSlice = createSlice({
    name: "macros",
    initialState: {
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
    },
    reducers: {
        setMacros: (state, action) => {
            state.fat = action.payload.fat;
            state.carbs = action.payload.carbs;
            state.protein = action.payload.protein;
            state.calories = action.payload.calories;
        },
    }
})

export const { setMacros } = macroSlice.actions;
export default macroSlice.reducer;