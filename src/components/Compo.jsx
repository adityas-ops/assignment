import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Compo({name,input,output}) {
  return (
    <>
        <Flex 
            width="350px"
            height="50px"
            border="2px solid black"
            margin="10px"
            alignItems="center"
            // justifyContent="space-between"
            borderRadius="10px"
        >
    
            <Text p="10px" fontWeight="800" borderRight="2px solid black" width="15%">
                {input}
            </Text>
            <Text p="10px" fontWeight="500" width="70%">
                {name}
            </Text>
            <Text p="10px" fontWeight="800" borderLeft="2px solid black" width="15%">
                {output}
            </Text>
        </Flex>
    </>
  )
}

export default Compo