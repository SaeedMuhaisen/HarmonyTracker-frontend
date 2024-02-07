import {createSlice} from '@reduxjs/toolkit';
export const userDetailsSlice = createSlice({
    name:'userDetails',

    initialState:{
        birthDate: 1262350800000, 
        weightI:'70',
        weightF:'0',
        weightUnit:'kg',
        height:'',
    },
   

    reducers:{
        updateBirthDate: (state,action)=>{
            state.birthDate = action.payload.birthDate;
        },
        updateWeightI: (state,action)=>{
            state.weightI=action.payload.weightI;
           
        },
        updateWeightF: (state,action)=>{
            state.weightF=action.payload.weightF;
        },
        updateWeightUnit: (state,action)=>{
            state.weightUnit=action.payload.weightUnit;
        },
        updateHeight: (state,action)=>{
            state.height=action.payload.height;
        }
    }
})

export const {updateBirthDate,updateWeightI,updateWeightF,updateWeightUnit,updateHeight} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;