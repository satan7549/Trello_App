import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

const TaskItem = ({ task, provided }) => {
  const createdAt = new Date(task.createdAt);

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
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Text fontWeight="bold">{task.title}</Text>
      <Text>Description: {task.description}</Text>
      <Text>
        Created At:{" "}
        {createdAt.toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </Text>
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
