import React from 'react'
import Card from '../components/Card'
import axios from "axios"
import {useNavigate} from "react-router-dom"

const Home = () => {
    
    const navigate = useNavigate()

    const url = process.env.REACT_APP_MAIL_URL

    const fetchUser = async()=>{
        try {
          const res = await axios.get(`${url}/users/fetch`);
        } catch (error) {
            
        }
    }
    
    const deleteUsers = async()=>{
        try {
          const res = await axios.delete(`${url}/users/delete`);
          console.log(res); 
        } catch (error) {
            
        }
    }

    const usersDetail = ()=>{
          navigate("/users");
    }


  return (
    <>
      <Card btn_name={"Fetch Users"} handleClick={fetchUser} />
      <Card btn_name={"Delete Users"} handleClick={deleteUsers} />
      <Card btn_name={"User Details"} handleClick={usersDetail} />
    </>
  );
}

export default Home
