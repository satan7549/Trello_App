import React from "react";
import { Box, Flex, Text, Image, Icon } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

const Header = () => {
  return (
    <Box
      bg="#157ee7"
      w="100%"
      h="12"
      p="3"
      borderBottom="1px"
      borderColor="#9fadbc29"
    >
      <Flex align="center" justify="space-between" h="100%" px="4">
        <Flex align="center">
          <Icon as={FaCheckCircle} color="white" boxSize="6" />
          <Text color="white" ml="2" fontSize="lg">
            To Do
          </Text>
        </Flex>
        <Flex align="center" spacing="4">
          <Text color="white">Remote dev</Text>
          <Image
            borderRadius="full"
            boxSize="28px"
            src="https://placehold.co/28x28/png"
            alt="Profile"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
