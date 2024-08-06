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
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import TaskColumn from "../components/TaskColumn";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTasks } from "../redux/tasks/action";
// import TaskModal from "../components/TaskModal";
// import { TouchBackend } from "react-dnd-touch-backend";

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

//   const todoTasks = tasks.filter((task) => task.column === "todo");
//   const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
//   const doneTasks = tasks.filter((task) => task.column === "done");

//   const backend = window.innerWidth < 768 ? TouchBackend : HTML5Backend;

//   if (loading.fetch) <Text>Loading...</Text>;

//   return (
//     <Flex direction="column" w="full" p={4}>
//       <Box mb={4}>
//         <Button
//           isLoading={loading.create}
//           loadingText="Adding"
//           onClick={onOpen}
//           bg={buttonBgColor}
//           color="white"
//           _hover={{ bg: "blue.700" }}
//           h={8}
//           px={4}
//           w={{ base: "full", md: "auto" }}
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
//         direction={{ base: "column", md: "row" }}
//         gap={{ base: 4, md: 0 }}
//       >
//         <Flex align="center" w={{ base: "100%", md: "auto" }}>
//           <Text mr={2}>Search</Text>
//           <Input type="search" borderColor={borderColor} />
//         </Flex>
//         <Flex align="center" w={{ base: "100%", md: "auto" }}>
//           <Text mr={2}>Sort By:</Text>
//           <Select borderColor={borderColor}>
//             <option>Recent</option>
//           </Select>
//         </Flex>
//       </Flex>
//       <DndProvider backend={backend}>
//         <Flex wrap="wrap" justify="space-between" gap={4}>
//           <TaskColumn title="TO DO" tasks={todoTasks} columnId="todo" />
//           <TaskColumn
//             title="IN PROGRESS"
//             tasks={inProgressTasks}
//             columnId="inprogress"
//           />
//           <TaskColumn title="DONE" tasks={doneTasks} columnId="done" />
//         </Flex>
//       </DndProvider>
//       <TaskModal isOpen={isOpen} onClose={onClose} />
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
  useToast,
} from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "../components/TaskColumn";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/tasks/action";
import TaskModal from "../components/TaskModal";
import { TouchBackend } from "react-dnd-touch-backend";
import LoadingSkeleton from "../components/Loading";

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.300", "blue.600");
  const buttonBgColor = useColorModeValue("blue.500", "blue.700");

  const { tasks, loading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [error, toast]);

  const todoTasks = tasks.filter((task) => task.column === "todo");
  const inProgressTasks = tasks.filter((task) => task.column === "inprogress");
  const doneTasks = tasks.filter((task) => task.column === "done");

  const backend = window.innerWidth < 768 ? TouchBackend : HTML5Backend;

  return (
    <Flex direction="column" w="full" p={4}>
      <Box mb={4}>
        <Button
          isLoading={loading.create}
          loadingText="Adding"
          onClick={onOpen}
          bg={buttonBgColor}
          color="white"
          _hover={{ bg: "blue.700" }}
          h={8}
          px={4}
          w={{ base: "full", md: "auto" }}
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
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 0 }}
      >
        <Flex align="center" w={{ base: "100%", md: "auto" }}>
          <Text mr={2}>Search</Text>
          <Input type="search" borderColor={borderColor} />
        </Flex>
        <Flex align="center" w={{ base: "100%", md: "auto" }}>
          <Text mr={2}>Sort By:</Text>
          <Select borderColor={borderColor}>
            <option>Recent</option>
          </Select>
        </Flex>
      </Flex>
      <DndProvider backend={backend}>
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
      <TaskModal isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Main;
