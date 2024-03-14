import { createSlice } from '@reduxjs/toolkit';

export const dailyIntakeSlice = createSlice({
    name: "dailyIntake",
    initialState: {
        fat: 0,
        carbs: 0,
        protein: 0,
        calories: 0,
        date: null,
    },
    reducers: {
        setFat: (state, action) => {
            state.fat = action.payload;
        },
        setCarbs: (state, action) => {
            state.carbs = action.payload;
        },
        setProtein: (state, action) => {
            state.protein = action.payload;

        },
        setCalories: (state, action) => {
            state.calories = action.payload;
        },
        setDate: (state, action) => {
            state.date = action.payload;
        }
    }
})

export const {
    setFat,
    setCarbs,
    setProtein,
    setCalories,
    setDate,
} = dailyIntakeSlice.actions;
export default dailyIntakeSlice.reducer;