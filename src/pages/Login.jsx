//packages
import React, { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

//Base URL
let URL = `https://todo-backend-jmoo.onrender.com`;

//local imports
import { AuthContext } from "../contexts/AuthContextProvider";


function Login() {
  let navigate = useNavigate();
  let { handleLogin } = useContext(AuthContext);
  let toast = useToast();
  let [details, setDetails] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    try {
      e.preventDefault(); // Prevent form submission reloading
      // console.log(details);
      if(!details.email || !details.password){
        return toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }

      // Making the post request
      let res = await axios({
        method: "POST",
        url: `${URL}/api/auth/login`,
        data: details,
      });

      // Checking if user exists
      if (res.data.message === "User not found") {
        // Resetting the form
        setDetails({
          email: "",
          password: "",
        });
        return toast({
          title: "User not found",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
      }

      // Checking if password is correct
      if (res.data.message === "Invalid credentials") {
        // Resetting the form
        setDetails({
          email: "",
          password: "",
        });
        return toast({
          title: "Invalid credentials",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }

      // Checking if user is logged in successfully
      if (res.data.message === "Login successful") {
        // Resetting the form
        setDetails({
          email: "",
          password: "",
        });
        toast({
          title: "Login successful",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        //setting the login state
        handleLogin()
        return navigate("/todos"); // Redirect to todos after successful login
      }

      // Resetting the form in case of any other scenario
      setDetails({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: error.response?.data?.message || "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Box
        w={{ base: "90%", md: "60%", lg: "40%" }}
        bg={"white"}
        p={5}
        mx="auto"
        mt={40}
        borderRadius={"10px"}
        boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
      >
        <Text fontSize={"2xl"} textAlign={"center"}>
          Login
        </Text>
        <form onSubmit={handleSubmit}>
          <Flex direction="column">
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
            <span
              style={{
                color: "blue",
                textDecoration: "underline",
                marginBottom: "10px",
              }}
            >
              <Link to="/register">{"Don't"} have an account?</Link>
            </span>
            <Button type="submit" colorScheme="orange" variant="solid">
              Login
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default Login;
