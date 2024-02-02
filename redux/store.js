import {configureStore} from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import macroSlice from './macroSlice';

export default configureStore({
    reducer:{
        user: userReducer,
        macros: macroSlice,
    }
});
