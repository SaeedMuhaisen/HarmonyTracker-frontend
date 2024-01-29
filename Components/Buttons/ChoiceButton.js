import React from "react";
import { Button, Text } from "tamagui";

export default function ({ text, func }) {
    return (
        <Button
            size={'$4'}
            backgroundColor={'white'}
            flexDirection='column'
            onPress={func}
            pressStyle={{ backgroundColor: '$color.light7' }}
        >
            <Text
                fontSize={'$4'}
                alignSelf='flex-start'
                fontWeight={'700'}
                color={'$color.dark5'}
            >{text}
            </Text>

        </Button>
    )
}