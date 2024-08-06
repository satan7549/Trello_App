import React from "react";
import { Box, Flex, Text, Icon, Button, useToast } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/auth/action";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const getActiveLinkStyle = (path) => {
    return location.pathname === path
      ? {
          fontWeight: "bold",
          color: "teal.200",
          borderBottom: "2px solid white",
        }
      : {};
  };

  const handleLogout = () => {
    dispatch(userLogout());
    toast({
      title: "Logged out successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/"); // Redirect to home or any other page after logout
  };

  return (
    <Box
      bg="#157ee7"
      w="100%"
      h="16" // Adjusted height for better spacing
      p="4" // Adjusted padding for more space
      borderBottom="1px"
      borderColor="#9fadbc29"
    >
      <Flex align="center" justify="space-between" h="100%">
        <Flex align="center">
          <Icon as={FaCheckCircle} color="white" boxSize="6" />
          <RouterLink to="/">
            <Text
              color="white"
              ml="3" // Increased margin for spacing
              fontSize="lg"
              style={getActiveLinkStyle("/")}
            >
              To Do
            </Text>
          </RouterLink>
        </Flex>
        <Flex align="center" gap="6">
          {" "}
          {/* Adjusted spacing between items */}
          {!isAuthenticated ? (
            <>
              <RouterLink to="/login">
                <Text
                  color="white"
                  fontSize="lg"
                  style={getActiveLinkStyle("/login")}
                >
                  Login
                </Text>
              </RouterLink>
              <RouterLink to="/signup">
                <Text
                  color="white"
                  fontSize="lg"
                  style={getActiveLinkStyle("/signup")}
                >
                  Signup
                </Text>
              </RouterLink>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              backgroundColor="white"
              color="blue.500"
              borderColor="blue.500"
              borderWidth="1px"
              variant="outline"
              fontSize="lg"
              _hover={{ bg: "blue.50", color: "blue.600" }}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
