import React from "react";
import { useNavigation } from "@react-navigation/native";

const useCustomNavigation = () => {
    const navigation = useNavigation();
    navigation.removeListener();

    return navigation;
};

export default useCustomNavigation;