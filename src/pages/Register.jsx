import React, { useState, useContext } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Text,
  useToast,
  textDecoration,
} from "@chakra-ui/react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

// Base URL
let URL = `https://todo-backend-jmoo.onrender.com`;

function Register() {
  let toast = useToast();
  let navigate = useNavigate();
  let { handleLogin } = useContext(AuthContext);
  let [details, setDetails] = useState({
    email: "",
    password: "",
    userName: "",
    gender: "",
  });

  async function handleSubmit(e) {
    e.preventDefault(); // Call preventDefault only once

    // Validate fields
    if (
      !details.email ||
      !details.password ||
      !details.userName ||
      !details.gender
    ) {
      return toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    try {
      // console.log(details);

      // Making the post request
      let res = await axios({
        method: "POST",
        url: `${URL}/api/auth/register`,
        data: details,
      });

      console.log(res);

      if(res.data.message === "User already exists"){
         setDetails({
           email: "",
           password: "",
           userName: "",
           gender: "",
         });
         // Display error toast
         return toast({
           title: "User already exists with this email",
           description: "please login",
           status: "warning",
           duration: 3000,
           isClosable: true,
         });
      }

      // Check for successful registration
      if (res.status === 201) {
        // Reset form
        setDetails({
          email: "",
          password: "",
          userName: "",
          gender: "",
        });
        //setting the login state
        handleLogin();
        // Display success toast
        toast({
          title: "Registered successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
       //navigate to todos
        navigate("/todos");
      }
    } catch (error) {
       toast({
         title: error.response.data.message,
         status: "error",
         duration: 3000,
         isClosable: true,
       })
    }
  }

  return (
    <div>
      <Box
        w={{ base: "90%", md: "70%", lg: "50%" }}
        p={4}
        mx="auto"
        mt={20}
        bg={"white"}
        borderRadius={"10px"}
        boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      >
        <Text fontSize={"2xl"} textAlign={"center"}>
          Register
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="column">
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={details.userName}
                onChange={(e) =>
                  setDetails({ ...details, userName: e.target.value })
                }
                type="text"
                placeholder="Enter username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={details.email}
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                type="email"
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                value={details.password}
                onChange={(e) =>
                  setDetails({ ...details, password: e.target.value })
                }
                type="password"
                placeholder="Enter password"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Gender</FormLabel>
              <Select
                placeholder="Select gender"
                value={details.gender}
                onChange={(e) =>
                  setDetails({ ...details, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </FormControl>
            <span style={{color:"blue",textDecoration:"underline",marginBottom:"10px"}}>
              <Link to="/login">Already have an account?</Link>
            </span>
            <Button type="submit" colorScheme="orange" variant="solid">
              Register
            </Button>
          </Flex>
        </form>
      </Box>
    </div>
  );
}

export default Register;
