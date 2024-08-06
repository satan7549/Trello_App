import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/tasks/action";
import TaskModal from "./TaskModal";

const TaskItem = ({ task, index }) => {
  const [viewMode, setViewMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();


  const dispatch = useDispatch();
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { ...task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const createdAt = new Date(task.createdAt);

  const handleDelete = () => {
    dispatch(deleteTask(task._id));
    toast({
      title: "Task deleted",
      description: `Task '${task.title}' has been deleted`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleView = () => {
    setViewMode(true);
    onOpen();
  };

  const handleEdit = () => {
    setViewMode(false);
    onOpen();
  };

  return (
    <>
      <Box
        ref={drag}
        w="full"
        p={4}
        bg="blue.200"
        borderRadius="md"
        borderWidth="2px"
        borderColor="transparent"
        _hover={{ borderColor: "blue.500" }}
        cursor="pointer"
        opacity={isDragging ? 0.5 : 1}
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
        <Flex mt={2} justify="space-around" wrap="wrap" gap={2}>
          <Button
            size="sm"
            bg="red.600"
            color="white"
            _hover={{ bg: "red.700" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            size="sm"
            bg="blue.400"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={handleEdit}
          >
            Edit
          </Button>
          <Button
            size="sm"
            bg="blue.600"
            color="white"
            _hover={{ bg: "blue.700" }}
            onClick={handleView}
          >
            View Detail
          </Button>
        </Flex>
      </Box>

      <TaskModal
        isOpen={isOpen}
        onClose={onClose}
        taskToEdit={task}
        viewMode={viewMode}
      />
    </>
  );
};

export default TaskItem;
