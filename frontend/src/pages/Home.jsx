import React, { useState } from 'react'
import Card from '../components/Card'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [loading,setLoading] = useState(false)

    const cancelRef = React.useRef();

    const navigate = useNavigate();

    const url = process.env.REACT_APP_MAIL_URL

    const fetchUser = async()=>{
        if(loading){
           return alert("already some data fetch is going on");
        }
        try {
          setLoading(true)
          const res = await axios.get(`${url}/users/fetch`);
          setLoading(false)
        } catch (error) {
            
        }
    }
    
    const deleteUsers = async()=>{
        try {
          const res = await axios.delete(`${url}/users/delete`);
          onClose()
          console.log(res); 
        } catch (error) {
          onClose();
          alert("No data found")
        }
    }

    const usersDetail = ()=>{
          navigate("/users");
    }


  return (
    <>
      <Card btn_name={"Fetch Users"} handleClick={fetchUser}/>
      <Card btn_name={"Delete Users"} handleClick={onOpen} />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to delete all of your users?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteUsers}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Card btn_name={"User Details"} handleClick={usersDetail} />
    </>
  );
}

export default Home
