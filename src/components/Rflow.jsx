import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Compo from "./Compo";
import ReactPaginate from "react-paginate";
import "../App.css";
import Flow from "./Flow";
import { ReactFlowProvider} from 'reactflow';
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
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 5;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = modules.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(modules.length / 5);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % modules.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  const [namea, setName] = useState("");
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await axios.get(
          `https://64307b10d4518cfb0e50e555.mockapi.io/modules`
        );
        const res1 = await axios.get(
          `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`
        )
        console.log("res",res1.data.name);
        setModules(res.data);
        setName(res1.data.name);
      } catch (err) {
        console.log(err);
      }
    };
    fetchModules();
  }, []);
  return (
    <>
      
      <Box width="100%" height="100vh" position="fixed">
      <ReactFlowProvider>
        <Box
          w="100%"
          h="50px"
          display="flex"
          alignItems="center"
          border="2px solid rgb(17, 46, 171)"
        >
          <Text p="10px" fontWeight="800">
            WorkFlow Name : {namea}
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
                position="absolute"
                bottom="0"
                left="200px"

                transform="translate(-50%, -50%)"

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
            <Box width="70%" 
             height="fit-content"
            >
              <Flow />
            </Box>
          </Flex>
        </Box>
        </ReactFlowProvider>
      </Box>
      
    </>
  );
}

export default Rflow;
