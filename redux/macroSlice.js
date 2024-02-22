import {createSlice} from '@reduxjs/toolkit';

export const macroSlice = createSlice({
    name: "macros",
    initialState:{
        fat:150,
        carbs:150,
        protein:150,
        calories:1500,
        bmi:0,
        bfp:0,
        dietType:0,
    },
    reducers:{
        setMacros: (state,action)=>{
            state.fat=action.payload.fat;
            state.carbs=action.payload.carbs;
            state.protein=action.payload.protein;
            state.calories=action.payload.calories;
        },
    }
})

export const {setMacros} = macroSlice.actions;
export default macroSlice.reducer;