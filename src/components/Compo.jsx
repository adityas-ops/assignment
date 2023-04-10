import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

function Compo({name,input,output}) {
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
      const [allData,setAllData] = useState({
            name: name,
            input: input,
            output: output
      })
  return (
    <div 
        draggable
        // send multiple data as name input and output
        onDragStart={(event) => onDragStart(event,
            JSON.stringify(allData),
            console.log(allData)
        )}
        // onDragStart={(event) => onDragStart(event, name)}
    >

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
    </div>
  )
}

export default Compo