import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
  Text,
  Link,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/auth/action";
import axios from "axios";

const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { firstName, lastName, email, password, confirmPassword } =
    signupDetails;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const authData = useSelector((state) => state.auth);
  const { isAuthenticated, loading, error } = authData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupDetails({ ...signupDetails, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSignup();
    }
  };

  const handleSignup = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    if (password.length < 6) {
      return toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    if (password !== confirmPassword) {
      return toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    dispatch(signup({ firstName, lastName, email, password }));
  };

  const handleGoogleSignup = async () => {
    window.open("http://localhost:8080/user/google", "_self");
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: `Welcome, ${firstName}!`,
        description: "Signup successful.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [isAuthenticated, toast, navigate, firstName]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Signup Failed.",
        description: `${error}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  return (
    <Container
      width="100%"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack
        width="full"
        maxWidth="400px"
        borderRadius="lg"
        border="2px solid blue"
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p={4}
      >
        <Heading
          fontWeight="bolder"
          textAlign="center"
          fontSize="20px"
          mb="20px"
          textColor={"blue"}
        >
          SIGNUP FORM
        </Heading>
        <FormControl p={2}>
          <Input
            name="firstName"
            value={firstName}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="First Name"
            borderRadius="lg"
            focusBorderColor="blue.600"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="lastName"
            value={lastName}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Last Name"
            borderRadius="lg"
            focusBorderColor="blue.600"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="email"
            placeholder="Email"
            borderRadius="lg"
            focusBorderColor="blue.600"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="password"
            value={password}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="Password"
            borderRadius="lg"
            focusBorderColor="blue.600"
            required
          />
        </FormControl>
        <FormControl p={2}>
          <Input
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="password"
            placeholder="Confirm Password"
            borderRadius="lg"
            focusBorderColor="blue.600"
            required
          />
        </FormControl>
        <FormControl>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="blue"
            _hover={{
              bg: "blue.300",
              color: "white",
            }}
            mt={4}
            onClick={handleSignup}
          >
            SIGN UP
          </Button>
        </FormControl>
        <Text mt={4}>
          Already have an account?{" "}
          <Link as={RouterLink} to="/login" color="blue.600">
            Login
          </Link>
        </Text>
        <FormControl>
          <Button
            isLoading={loading}
            loadingText="Submitting"
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="blue"
            _hover={{
              bg: "blue.300",
              color: "white",
            }}
            mt={4}
            onClick={handleGoogleSignup}
          >
            Sign up with Google
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Signup;
