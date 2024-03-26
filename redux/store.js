import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import macroSlice from './macroSlice';
import userDetailsSlice from './userDetailsSlice';
import surveyResultSlice from './surveyResultSlice';
import dailyIntakeSlice from './dailyIntakeSlice';
import foodLogSlice from './foodLogSlice';

// Define a special action type for resetting the state


// Define a proxy reducer that resets the state when the RESET_STATE action is dispatched
const rootReducer = combineReducers({
    user: userReducer,
    macros: macroSlice,
    userDetails: userDetailsSlice,
    surveyResult: surveyResultSlice,
    dailyIntake: dailyIntakeSlice,
    foodLog: foodLogSlice,
});

const resettableRootReducer = (state, action) => {
    if (action.type === 'store/reset') {
        // Reset the state by calling the root reducer with undefined as the state argument
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

export default configureStore({
    reducer: resettableRootReducer,
});