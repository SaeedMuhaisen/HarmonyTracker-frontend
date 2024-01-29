import React from "react";
import { XStack,  Text, Separator } from "tamagui";

export default function ({label,paddingVertical}) {
    return (
        <XStack alignItems="center" gap={10} paddingVertical={paddingVertical}>
            <Separator borderColor={'$color.light8'} />
            <Text fontSize={'$4'} color={'gray'} >{label}</Text>
            <Separator borderColor={'$color.light8'} />
        </XStack>
    )
}