import React from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'

function List({loading,error,data}) {
  return (
    <>
    <Box 
       w="100%"
        // h="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom="100px"

      >
     <TableContainer mt="100px" w="800px" textAlign="center">
  <Table variant="striped" justifyContent="center" alignItems="center" flexDir="column" borderWidth="2px" >
    <Thead bg="blue.600" color="white" fontSize="20px">
      <Tr>
        <Th color="white" fontSize="20px">Name</Th>
        <Th color="white" fontSize="20px">Input Type</Th>
        <Th color="white" fontSize="20px">Created at</Th>
      </Tr>
    </Thead>
    <Tbody>
      {loading ? (
        <Tr>
          <Td colSpan="3">Loading...</Td>
        </Tr>
      ) : error ? (
        <Tr>
          <Td colSpan="3">Error</Td>
        </Tr>
      ) : (
        data.map((item) => (
          <Tr key={item.id} textAlign="center">
            <Td>
            <NavLink
            to={`/rflow/${item.id}`}
            style={{
          
          textDecoration: 'underline',
          fontWeight:"700"
             }}
            >
            {item.name}
          </NavLink>
            </Td>
            <Td>{item.input_type}</Td>
            <Td>{item.createdAt.substring(0, 10)}</Td>
          </Tr>
        ))
      )}
    </Tbody>
  </Table>
</TableContainer>
</Box>
   </>
  )
}

export default List