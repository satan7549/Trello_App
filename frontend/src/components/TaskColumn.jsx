import React, { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/tasks/action";

const TaskColumn = ({ title, tasks, columnId }) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (item) => {
      if (item.column === columnId) {
        // Reorder within the same column
        const dragIndex = item.index;
        const hoverIndex = localTasks.findIndex((task) => task.id === item.id);

        if (
          dragIndex !== undefined &&
          hoverIndex !== undefined &&
          dragIndex !== hoverIndex
        ) {
          const newTasks = [...localTasks];
          const [movedTask] = newTasks.splice(dragIndex, 1);
          newTasks.splice(hoverIndex, 0, movedTask);

          // Update the local state to reflect the new order
          setLocalTasks(newTasks);

          // Optionally, you can call the dispatch here if you want to sync the changes with the server
          // newTasks.forEach((task, idx) => {
          //   const updatedTask = { ...task, index: idx };
          //   dispatch(updateTask(task._id, updatedTask));
          // });
        }
      } else if (item.column !== columnId) {
        // Move task to a different column
        const updatedTask = { ...item, column: columnId };
        dispatch(updateTask(item._id, updatedTask));
      }
    },
  });

  return (
    <Box w="30%" p={3} bg="gray.50" borderRadius="md" boxShadow="md" ref={drop}>
      <Heading as="h3" size="md" mb={4}>
        {title}
      </Heading>
      <VStack spacing={4}>
        {localTasks.map((task, index) => (
          <TaskItem key={task.id} task={task} index={index} />
        ))}
      </VStack>
    </Box>
  );
};

export default TaskColumn;
