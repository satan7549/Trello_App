import React, { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "../components/TaskColumn";
import TaskAddModal from "../components/TaskAddModal";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../redux/tasks/action";

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.300", "blue.600");
  const buttonBgColor = useColorModeValue("blue.500", "blue.700");

  const { tasks, loading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, tasks.length]);

  const handleAddTask = (task) => {
    const newTask = { ...task, column: "todo" };
    dispatch(createTask(newTask));
  };

  if (loading) return <Text>Loading...</Text>;

  const todoTasks = tasks.filter((task) => task.column === "todo");
  const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
  const doneTasks = tasks.filter((task) => task.column === "done");

  return (
    <Flex direction="column" w="full" p={4}>
      <Box mb={4}>
        <Button
          onClick={onOpen}
          bg={buttonBgColor}
          color="white"
          _hover={{ bg: "blue.700" }}
          h={8}
          px={4}
        >
          Add Task
        </Button>
      </Box>
      <Flex
        p={3}
        bg={bgColor}
        borderRadius="md"
        boxShadow="md"
        justify="space-between"
        align="center"
        mb={4}
      >
        <Flex align="center">
          <Text mr={2}>Search</Text>
          <Input type="search" borderColor={borderColor} />
        </Flex>
        <Flex align="center">
          <Text mr={2}>Sort By:</Text>
          <Select borderColor={borderColor}>
            <option>Recent</option>
          </Select>
        </Flex>
      </Flex>
      <DndProvider backend={HTML5Backend}>
        <Flex wrap="wrap" justify="space-between" gap={4}>
          <TaskColumn title="TO DO" tasks={todoTasks} columnId="todo" />
          <TaskColumn
            title="IN PROGRESS"
            tasks={inProgressTasks}
            columnId="inprogress"
          />
          <TaskColumn title="DONE" tasks={doneTasks} columnId="done" />
        </Flex>
      </DndProvider>

      <TaskAddModal
        isOpen={isOpen}
        onClose={onClose}
        onAddTask={handleAddTask}
      />
    </Flex>
  );
};

export default Main;
