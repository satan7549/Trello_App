import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Link,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { login } from "../redux/auth/action";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const { email, password } = loginDetails;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const authData = useSelector((state) => state.auth);
  const { loading, isAuthenticated, error } = authData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const handleLogin = () => {
    if (email === "" || password === "") {
      return toast({
        title: "Validation Error",
        description: "Fill both credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
    dispatch(login(loginDetails));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: `Hello, ${email}!`,
        description: "Login successful.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    }
  }, [isAuthenticated, toast, navigate, email]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Failed.",
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
          LOGIN FORM
        </Heading>
        <FormControl p={2}>
          <Input
            name="email"
            value={email}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            type="text"
            placeholder="Enter Email"
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
            placeholder="Enter password"
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
            // variant="outline"
            mt={4}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </FormControl>
        <Text mt={4}>
          Create an account?{" "}
          <Link as={RouterLink} to="/signup" color="blue.600">
            Signup
          </Link>
        </Text>
      </VStack>
    </Container>
  );
};

export default Login;
