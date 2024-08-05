import React from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, tasks }) => {
  return (
    <VStack
      w={{ base: "full", md: "30%" }}
      bg="white"
      borderRadius="md"
      p={4}
      boxShadow="md"
      spacing={4}
    >
      <Flex
        w="full"
        justify="space-between"
        bg="blue.500"
        p={2}
        borderRadius="sm"
        color="white"
      >
        <Text>{title}</Text>
      </Flex>
      <VStack spacing={4} w="full">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} />
        ))}
      </VStack>
    </VStack>
  );
};

export default TaskColumn;
