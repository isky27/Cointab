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
  Select,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

const Users = () => {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(false)
  const [count,setCount] = useState(0)
  const [gender,setGender]=useState("")
   const url = process.env.REACT_APP_MAIL_URL;
   
   const getData = async(page=1)=>{
        setLoading(true)
        try {
            const res = await axios.get(`${url}/users/api?page=${page}&gender=${gender}`);
            setData(res.data.userdata);
            setCount(res.data.count)
            setLoading(false);

            } catch (error) {
                console.log(error);
               setLoading(false);

            }
   }

   const genderFilter=(event)=>{
      setGender(event.target.value);
   }
  useEffect(()=>{
   getData()
  }, [gender]);

  return (
    <Box w={"100%"} m={"auto"}>
      <Box w={"100%"} m={"auto"} py={2} textAlign={"center"}>
        <Button
          textAlign={"center"}
          m={"auto"}
          colorScheme="blue"
          onClick={() => navigate("/")}
        >
          Home
        </Button>
      </Box>
      <Select placeholder="Select Gender" size="md" onChange={genderFilter}>
        <option value="">All</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
      {loading ? (
        <Text m={"auto"} textAlign={"center"}>
          "Loading..."
        </Text>
      ) : (
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
      )}

      <Pagination
        w={"100%"}
        m={"auto"}
        totalItems={count}
        itemsPerPage={10}
        paginate={getData}
      />
    </Box>
  );
};

export default Users;
