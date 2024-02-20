import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState:{
        firstname:"",
        lastname:"",
        email:"",
        phoneNumber:"",
        access_token:"",
        refresh_token:"",
        dietType:"",
        initialized:false,
    },
    reducers:{
        updateUserTokens: (state,action)=>{
            state.access_token=action.payload.refreshToken;
            state.refresh_token=action.payload.token;
            state.initialized=action.payload.initialized;
        },
        updateUserDetails: (state,action)=>{
            state.firstname=action.payload.firstname;
            state.lastname=action.payload.lastname;
            state.email=action.payload.email;
        },
        updateDietType:(state,action)=>{
            state.dietType=action.payload;
        }
    }
})

export const {updateUserDetails,updateUserTokens,updateDietType} = userSlice.actions;
export default userSlice.reducer;