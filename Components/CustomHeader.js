import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
    XStack,
    YStack,
    Stack,
    View,
    Text,
    Button,
    Header,
    Circle,
    useTheme,
    Spacer,
} from "tamagui";
import { ArrowLeft } from '@tamagui/lucide-icons'
import { Platform } from "react-native";



function CustomHeader({ title, goBackEnabled = true, onlyPadding = false, children }) {
    const navigation = useNavigation();
    const goBack = () => {
        navigation.goBack();
    };
    return (
        <YStack paddingTop={Platform.OS === 'ios' ? 50 : 0}>
            {!onlyPadding &&
                <XStack justifyContent='space-between' >

                    <XStack width={'$5'}>
                        {goBackEnabled &&
                            <Button 
                            icon={ArrowLeft} onPress={goBack}  
                            forceStyle={null}
                            size={40}
                            color={'$color.dark7'}
                            >
                            </Button>
                        }
                    </XStack>

                    <XStack flex={1} alignItems="center" justifyContent="center">
                        <Text color={'$color.dark7'}fontSize={'$8'} fontWeight={'600'}>{title}</Text>
                    </XStack>

                    <XStack width={'$5'}>
                        {children}
                    </XStack>
                </XStack>
            }
        </YStack>

    );
}
export default CustomHeader;