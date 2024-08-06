// import React, { useEffect } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   Input,
//   Select,
//   Text,
//   useColorModeValue,
//   useDisclosure,
// } from "@chakra-ui/react";
// import TaskColumn from "../components/TaskColumn";
// import TaskAddModal from "../components/TaskAddModal";
// import { useDispatch, useSelector } from "react-redux";
// import { createTask, fetchTasks } from "../redux/tasks/action";

// const Main = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const dispatch = useDispatch();

//   const bgColor = useColorModeValue("white", "gray.800");
//   const borderColor = useColorModeValue("blue.300", "blue.600");
//   const buttonBgColor = useColorModeValue("blue.500", "blue.700");

//   const { tasks, loading, error } = useSelector((state) => state.task);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   const handleAddTask = (task) => {
//     const newTask = { ...task, column: "todo" };
//     dispatch(createTask(newTask));
//   };

//   const todoTasks = tasks.filter((task) => task.column === "todo");
//   const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
//   const doneTasks = tasks.filter((task) => task.column === "done");

//   if (loading) <Text>Loading...</Text>;

//   return (
//     <Flex direction="column" w="full" p={4}>
//       <Box mb={4}>
//         <Button
//           onClick={onOpen}
//           bg={buttonBgColor}
//           color="white"
//           _hover={{ bg: "blue.700" }}
//           h={8}
//           px={4}
//         >
//           Add Task
//         </Button>
//       </Box>
//       <Flex
//         p={3}
//         bg={bgColor}
//         borderRadius="md"
//         boxShadow="md"
//         justify="space-between"
//         align="center"
//         mb={4}
//       >
//         <Flex align="center">
//           <Text mr={2}>Search</Text>
//           <Input type="search" borderColor={borderColor} />
//         </Flex>
//         <Flex align="center">
//           <Text mr={2}>Sort By:</Text>
//           <Select borderColor={borderColor}>
//             <option>Recent</option>
//           </Select>
//         </Flex>
//       </Flex>
//       <Flex wrap="wrap" justify="space-between" gap={4}>
//         {/* TO DO */}
//         <TaskColumn title="TO DO" tasks={todoTasks} />
//         {/* IN PROGRESS */}
//         <TaskColumn title="IN PROGRESS" tasks={inProgressTasks} />
//         {/* DONE */}
//         <TaskColumn title="DONE" tasks={doneTasks} />
//       </Flex>

//       {/* Use TaskModal Component */}
//       <TaskAddModal
//         isOpen={isOpen}
//         onClose={onClose}
//         onAddTask={handleAddTask}
//       />
//     </Flex>
//   );
// };

// export default Main;

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
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskColumn from "../components/TaskColumn";
import TaskAddModal from "../components/TaskAddModal";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks, updateTask } from "../redux/tasks/action";

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.300", "blue.600");
  const buttonBgColor = useColorModeValue("blue.500", "blue.700");

  const { tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddTask = (task) => {
    const newTask = { ...task, column: "todo" };
    dispatch(createTask(newTask));
  };

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find((task) => task.id === draggableId);
    const updatedTask = { ...draggedTask, column: destination.droppableId };
    dispatch(updateTask(updatedTask));
  };

  const todoTasks = tasks.filter((task) => task.column === "todo");
  const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
  const doneTasks = tasks.filter((task) => task.column === "done");

  if (loading) return <Text>Loading...</Text>;

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Flex wrap="wrap" justify="space-between" gap={4}>
          {/* TO DO */}
          <Droppable droppableId="todo">
            {(provided) => (
              <TaskColumn title="TO DO" tasks={todoTasks} provided={provided} />
            )}
          </Droppable>
          {/* IN PROGRESS */}
          <Droppable droppableId="inprogress">
            {(provided) => (
              <TaskColumn
                title="IN PROGRESS"
                tasks={inProgressTasks}
                provided={provided}
              />
            )}
          </Droppable>
          {/* DONE */}
          <Droppable droppableId="done">
            {(provided) => (
              <TaskColumn title="DONE" tasks={doneTasks} provided={provided} />
            )}
          </Droppable>
        </Flex>
      </DragDropContext>

      <TaskAddModal
        isOpen={isOpen}
        onClose={onClose}
        onAddTask={handleAddTask}
      />
    </Flex>
  );
};

export default Main;
