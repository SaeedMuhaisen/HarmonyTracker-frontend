import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: {
        signedIn: false,
        firstname: "",
        lastname: "",
        email: "",
        access_token: "",
        refresh_token: "",
    },
    reducers: {
        updateUserTokens: (state, action) => {
            state.access_token = action.payload.refreshToken;
            state.refresh_token = action.payload.token;
            state.initialized = action.payload.initialized;
        },
        updateUserDetails: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
        },
        setSignedIn: (state, action) => {
            state.signedIn = action.payload;
        },
        
    }
})

export const { updateUserDetails, updateUserTokens, updateDietType, setSignedIn } = userSlice.actions;
export default userSlice.reducer;