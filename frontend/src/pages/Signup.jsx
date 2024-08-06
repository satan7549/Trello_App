import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/auth/action";

const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
  });
  const { email, password } = signupDetails;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const authData = useSelector((state) => state.auth);
  const { isAuthenticated } = authData;

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
    if (email === "" || password === "") {
      return toast({
        title: "Validation Error",
        description: "Fill both credentials",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }

    setLoading(true);

    dispatch(signup(signupDetails))
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast({
        title: `Welcome, ${email}!`,
        description: "Signup successful.",
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
        title: "Signup Failed.",
        description: `${error}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const handleLogin = () => {
    navigate("/login");
  };

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
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
        p={4}
      >
        <Heading
          fontWeight="bolder"
          textAlign="center"
          fontSize="20px"
          mb="20px"
        >
          SIGNUP FORM
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
            focusBorderColor="teal.100"
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
            focusBorderColor="teal.100"
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
            colorScheme="teal"
            _hover={{
              bg: "teal.300",
              color: "white",
            }}
            variant="outline"
            mt={4}
            onClick={handleSignup}
          >
            SIGN UP
          </Button>
        </FormControl>
        <FormControl>
          <Button
            width="full"
            p={4}
            borderRadius="lg"
            colorScheme="teal"
            _hover={{
              bg: "teal.300",
              color: "white",
            }}
            variant="outline"
            mt={4}
            onClick={handleLogin}
          >
            LOGIN
          </Button>
        </FormControl>
      </VStack>
    </Container>
  );
};

export default Signup;
