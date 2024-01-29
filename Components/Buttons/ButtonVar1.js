import React from "react";
import { Button,Text } from "tamagui";
export default function ({func,text}) {
    return (
        <Button backgroundColor={'#DF4042'} height={50} borderRadius={30} onPress={() => { func }} >
            <Text color={'white'} fontWeight={600} fontSize={20}>{text}</Text>
        </Button>
    )
}