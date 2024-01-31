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
    },
    reducers:{
        updateUserTokens: (state,action)=>{
            state.access_token=action.payload.refreshToken;
            state.refresh_token=action.payload.token;
        },
        updateUserDetails: (state,action)=>{
            state.firstname=action.payload.firstname;
            state.lastname=action.payload.lastname;
            state.email=action.payload.email;
        }
    }
})

export const {updateUserDetails,updateUserTokens} = userSlice.actions;
export default userSlice.reducer;