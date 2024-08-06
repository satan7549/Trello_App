import React, { useState, useEffect } from "react";
import { Box, Heading, useToast, VStack } from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import TaskItem from "./TaskItem";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/tasks/action";

const TaskColumn = ({ title, tasks, columnId }) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (item) => {
      if (item.column === columnId) {
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

          setLocalTasks(newTasks);
          item.index = hoverIndex;
        }
      } else {
        const updatedTask = { ...item, column: columnId };
        dispatch(updateTask(item._id, updatedTask));
        item.index = -1;
      }
    },
  });

  return (
    <Box
      w={{ base: "100%", md: "30%" }}
      p={3}
      bg="gray.50"
      borderRadius="md"
      boxShadow="md"
      ref={drop}
    >
      <Box p={3} bg="blue.500" borderRadius="md">
        <Heading as="h3" size="md" color="white">
          {title}
        </Heading>
      </Box>
      <VStack pt={4} spacing={2}>
        {localTasks.map((task, index) => (
          <TaskItem key={task._id} task={task} index={index} />
        ))}
      </VStack>
    </Box>
  );
};

export default TaskColumn;
