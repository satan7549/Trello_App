import React from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import TaskColumn from "../components/TaskColumn";

const Main = () => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("blue.300", "blue.600");
  const buttonBgColor = useColorModeValue("blue.500", "blue.700");

  return (
    <Flex direction="column" w="full" p={4}>
      <Box mb={4}>
        <Button
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
      <Flex wrap="wrap" justify="space-between" gap={4}>
        {/* TO DO */}
        <TaskColumn
          title="TO DO"
          tasks={[{ name: "Task 1" }, { name: "Task 2" }]}
        />
        {/* IN PROGRESS */}
        <TaskColumn
          title="IN PROGRESS"
          tasks={[{ name: "Task 3" }, { name: "Task 4" }]}
        />
        {/* DONE */}
        <TaskColumn
          title="DONE"
          tasks={[{ name: "Task 5" }, { name: "Task 6" }]}
        />
      </Flex>
    </Flex>
  );
};

export default Main;
