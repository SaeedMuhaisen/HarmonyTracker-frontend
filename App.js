import React from "react"
import { View, Text, Button, XStack, YStack } from "tamagui";
import { TamaguiProvider } from "tamagui";
import config from "./Theme/tamagui.config";
import MobileNavigation from "./Navigation/MobileNavigation";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import store from "./redux/store";

export default () => {
  return (
    <Provider store={store}>
      <TamaguiProvider config={config} defaultTheme={'dark'} >
        <MobileNavigation>
        </MobileNavigation>
      </TamaguiProvider>
    </Provider>
  );
}