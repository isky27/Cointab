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
  AlertDialogCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Home = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [loading,setLoading] = useState(false)

    const [deleteLoading, setDeleteLoading] = useState(false)

    const [fetchAlert, setFetchAlert]= useState(false)

    const cancelRef = React.useRef();

    const navigate = useNavigate();

    const url = process.env.REACT_APP_MAIL_URL

    const fetchUser = async()=>{
        if(loading){
         return setFetchAlert(true)
       }
        try {
          setLoading(true)
          const res = await axios.get(`${url}/users/fetch`);
          setLoading(false)
          setFetchAlert(false)
        } catch (error) {
            
        }
    }
    
    const deleteUsers = async()=>{
           setDeleteLoading(true);
        try {
          const res = await axios.delete(`${url}/users/delete`);
           setDeleteLoading(false);
           onClose();
        } catch (error) {
           setDeleteLoading(false);
          onClose();
          alert("No data found")
        }
    }

    const usersDetail = ()=>{
          navigate("/users");
    }


  return (
    <>
      {fetchAlert && (
        <Alert status="error" w={"80%"} m={"auto"}>
          <AlertIcon />
          <AlertTitle>Already some data fetch is going on!</AlertTitle>
          <AlertDescription>Please Wait.</AlertDescription>
        </Alert>
      )}
      <Card btn_name={"Fetch Users"} handleClick={fetchUser} />
      <Card btn_name={"Delete Users"} handleClick={onOpen} />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
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
            <Button
              colorScheme="red"
              ml={3}
              onClick={deleteUsers}
              isLoading={deleteLoading}
            >
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
