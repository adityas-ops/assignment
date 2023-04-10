import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
// import {Pagination,Typography }from '@mui/material';
import Compo from "./Compo";
import ReactPaginate from "react-paginate";
import "../App.css";

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <Compo
            key={item.id}
            id={item.id}
            name={item.name}
            input={item.input_type}
            output={item.output_type}
          />
        ))}
    </>
  );
}

function Rflow() {
  const { name } = useParams();
  const [modules, setModules] = useState([]);

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = modules.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(modules.length / 5);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % modules.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get(
          `https://64307b10d4518cfb0e50e555.mockapi.io/modules`
        );
        console.log(res.data);
        setModules(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModules();
  }, []);

  return (
    <>
      <Box width="100%" height="100vh" position="fixed">
        <Box
          w="100%"
          h="50px"
          display="flex"
          alignItems="center"
          border="2px solid rgb(17, 46, 171)"
        >
          <Text p="10px" fontWeight="800">
            WorkFlow Name : {name}
          </Text>
        </Box>
        <Box>
          <Flex>
            <Box
              width="30%"
              borderRight="2px solid rgb(17, 46, 171)"
              height="95vh"
            >
              <Box borderBottom="2px solid rgb(17, 46, 171)">
                <Text p="10px" fontWeight="800">
                  Modules
                </Text>
              </Box>
              <Box p="10px">
                <Items currentItems={currentItems} />
                <Box
                  style={{
                    // add this in the bottom
                

                  }}
                >
                  <ReactPaginate
                    breakClassName="break-me"
                    className="paginate"
                    breakLabel="...."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    activeClassName="active"
                    previousClassName="prev"
                    nextClassName="next"
                    pageClassName="page"
                    // pageRangeDisplayed={}
                  />
                </Box>
              </Box>
            </Box>
            <Box width="70%"></Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

export default Rflow;
