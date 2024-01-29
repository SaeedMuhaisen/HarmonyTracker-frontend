import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState:{
        uid:"",
        firstname:"",
        lastname:"",
        email:"",
        phoneNumber:"",
        access_token:"",
        refresh_token:"",
    },
    reducers:{
        update: (state,action)=>{
            state.access_token=action.payload.refreshToken;
            state.refresh_token=action.payload.token;
        },
    }
})

export const {update} = userSlice.actions;
export default userSlice.reducer;