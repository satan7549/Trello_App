import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createTask, fetchTasks, updateTask } from "../redux/tasks/action";

const TaskModal = ({ isOpen, onClose, taskToEdit, viewMode }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [taskToEdit]);

  const handleSave = () => {
    if (taskToEdit) {
      const updatedTask = { ...taskToEdit, title, description };
      dispatch(updateTask(updatedTask._id, updatedTask));
      toast({
        title: "Task updated",
        description: `Task '${title}' has been updated`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const newTask = { title, description, column: "todo" };
      dispatch(createTask(newTask));
      toast({
        title: "Task added",
        description: `Task '${title}' has been added`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {viewMode
            ? "View Details"
            : taskToEdit
            ? "Edit Task"
            : "Add New Task"}
        </ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            {viewMode ? (
              <Text>{title}</Text>
            ) : (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
              />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            {viewMode ? (
              <Text>{description}</Text>
            ) : (
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task Description"
              />
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {viewMode ? (
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          ) : (
            <>
              <Button colorScheme="blue" mr={3} onClick={handleSave}>
                {taskToEdit ? "Save" : "Add"}
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskModal;
