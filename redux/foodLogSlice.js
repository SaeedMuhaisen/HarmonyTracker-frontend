import { createSlice } from '@reduxjs/toolkit';

export const foodLogSlice = createSlice({
    name: "foodLog",
    initialState: [],
    reducers: {
        addFoodItem: (state, action) => {
            state.push(action.payload);
        },
        removeFoodItem: (state, action) => {
            return state.filter(item => item.id !== action.payload.id);
        },
        clearFoodLog: state => {
            return [];
        }
    }
})

export const {
    addFoodItem,
    removeFoodItem,
    clearFoodLog,
} = foodLogSlice.actions;
export default foodLogSlice.reducer;