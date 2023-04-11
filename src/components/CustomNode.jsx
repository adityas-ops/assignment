import { Box, Flex, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
  return (
    <div 
     style={{
      background:'transparent'

     }}
    >
    <Box 
        bg="white"
        color="black"
    >
      <Flex 
        width="350px"
        height="50px"
        border="2px solid lightblue"
        borderRadius="10px"
        

      >
        <Text  display="flex" justifyContent="center" alignItems="center"  fontWeight="800" borderRight="2px solid lightblue" width="15%">{data.input}</Text>
          <Text display="flex" justifyContent="center" alignItems="center"   fontWeight="500" width="70%">{data.name}</Text>
          <Text display="flex" justifyContent="center" alignItems="center"  fontWeight="800" borderLeft="2px solid lightblue" width="15%">{data.output}</Text>
      </Flex>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </Box>
    </div>
  );
}

export default memo(CustomNode);