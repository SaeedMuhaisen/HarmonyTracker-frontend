import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import macroSlice from './macroSlice';
import userDetailsSlice from './userDetailsSlice';
import surveyResultSlice from './surveyResultSlice';
import dailyIntakeSlice from './dailyIntakeSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        macros: macroSlice,
        userDetails: userDetailsSlice,
        surveyResult: surveyResultSlice,
        dailyIntake: dailyIntakeSlice,
    }
});
