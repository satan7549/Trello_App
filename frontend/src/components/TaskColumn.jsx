import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import TaskItem from "./TaskItem";

const TaskColumn = ({ title, tasks, provided }) => {
  return (
    <Box
      w="30%"
      p={3}
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <Heading as="h3" size="md" mb={4}>
        {title}
      </Heading>
      <VStack spacing={4}>
        {tasks.map((task, index) => (
          <Draggable key={task.id} draggableId={task.id} index={index}>
            {(provided) => <TaskItem task={task} provided={provided} />}
          </Draggable>
        ))}
        {provided.placeholder}
      </VStack>
    </Box>
  );
};

export default TaskColumn;
