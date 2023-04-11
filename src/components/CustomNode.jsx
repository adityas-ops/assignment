import { Box, Flex, Text } from '@chakra-ui/react';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

function CustomNode({ data }) {
    const bc = (value)=>{
        let border;
        if(value === '->'){
            border = '2px solid lightblue'
        }
        else{
            border = '2px solid red'
        }
        return border

    }

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
        borderRadius="10px"
        border={bc(data.input)}
        

      >
        <Text  display="flex" justifyContent="center" alignItems="center"  fontWeight="800" borderRight={bc(data.input)} width="15%">{data.input}</Text>
          <Text display="flex" justifyContent="center" alignItems="center"  bg="#c9eaff" fontWeight="500" width="70%">{data.name}</Text>
          <Text display="flex" justifyContent="center" alignItems="center"  fontWeight="800" borderLeft={bc(data.input)} width="15%">{data.output}</Text>
      </Flex>

     {
        data.input === '->' ? (
            <Handle
            type="target"
            position={Position.Bottom}
            style={{ background: '#555' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            />
        ) : (
            <>
            <Handle
            type="source"
            position={Position.Top}
            style={{ background: '#555' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
            type="target"
            position={Position.Bottom}
            style={{ background: '#555' }}
            onConnect={(params) => console.log('handle onConnect', params)}
            />
            </>
            

        )
     }
    </Box>
    </div>
  );
}

export default memo(CustomNode);