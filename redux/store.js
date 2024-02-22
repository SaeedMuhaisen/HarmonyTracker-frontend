import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import macroSlice from './macroSlice';
import userDetailsSlice from './userDetailsSlice';

export default configureStore({
    reducer:{
        user: userReducer,
        macros: macroSlice,
        userDetails:userDetailsSlice,
    }
});
