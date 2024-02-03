import 'react-native-gesture-handler';
import React from "react"
import MobileNavigation from "./Navigation/MobileNavigation";
import { Provider } from "react-redux";
import store from "./redux/store";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Provider store={store}>
        <MobileNavigation>
        </MobileNavigation>
      </Provider>
    </GestureHandlerRootView>
  );
}