import 'react-native-gesture-handler';
import React from "react"
import MobileNavigation from "./Navigation/MobileNavigation";
import { Provider } from "react-redux";
import store from "./redux/store";

export default () => {
  return (
    <Provider store={store}>
        <MobileNavigation>
        </MobileNavigation>
    </Provider>
  );
}