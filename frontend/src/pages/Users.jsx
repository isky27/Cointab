import {
    Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Users = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  
  const [page,setPage] = useState(1)
  const [count,setCount] = useState(0)
   const url = process.env.REACT_APP_MAIL_URL;
   
   const getData = async(page=2)=>{
    console.log("getting")
        try {
            const res = await axios.get(`${url}/users/api?page=${page}`);
            setData(res.data.userdata);
            setCount(res.data.count)
            } catch (error) {
                console.log(error);
            }
   }

  useEffect(()=>{
   getData()
  }, []);

  return (
    <Box w={"100%"} m={"auto"}>
        <Box w={"100%"} m={"auto"} py={2} textAlign={"center"}> 
         <Button textAlign={"center"} m={"auto"} colorScheme="blue" onClick={() => navigate("/")}>
            Home
        </Button>
        </Box>
 
      <TableContainer m={"auto"}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>City, State</Th>
              <Th>Age</Th>
              <Th>Profile</Th>
            </Tr>
          </Thead>
          {data &&
            data.map((el) => {
              return (
                <Tbody key={el._id}>
                  <Tr>
                    <Td>{`${el.name.title} ${el.name.first} ${el.name.last}`}</Td>
                    <Td>{`${
                      el.gender.charAt(0).toUpperCase() + el.gender.slice(1)
                    }`}</Td>
                    <Td>{`${el.location.city}, ${el.location.state}`}</Td>
                    <Td>{`${el.dob.age} Yrs`}</Td>
                    <Td>
                      <Image w={"30px"} src={el.picture.large} />
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>

      <Pagination w={"100%"} m={"auto"} totalItems={count} itemsPerPage={10} paginate={getData}  />
    </Box>
  );
};

export default Users;
