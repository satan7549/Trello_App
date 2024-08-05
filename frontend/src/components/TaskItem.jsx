import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const TaskItem = ({ task }) => {
  return (
    <Box
      w="full"
      p={4}
      bg="blue.200"
      borderRadius="md"
      borderWidth="2px"
      borderColor="transparent"
      _hover={{ borderColor: "blue.500" }}
      cursor="pointer"
    >
      <Text fontWeight="bold">{task.name}</Text>
      <Text>{task.description || "Description"}</Text>
      <Text>{task.createdAt || "Created At"}</Text>
      <Flex mt={2} justify="space-around">
        <Button size="sm" bg="red.600" color="white" _hover={{ bg: "red.700" }}>
          Delete
        </Button>
        <Button
          size="sm"
          bg="blue.400"
          color="white"
          _hover={{ bg: "blue.500" }}
        >
          Edit
        </Button>
        <Button
          size="sm"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.700" }}
        >
          View Detail
        </Button>
      </Flex>
    </Box>
  );
};

export default TaskItem;
