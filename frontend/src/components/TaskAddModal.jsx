// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   Button,
// } from "@chakra-ui/react";

// const TaskAddModal = ({ isOpen, onClose, onAddTask }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAddTask = () => {
//     onAddTask({ title, description });
//     setTitle("");
//     setDescription("");
//     onClose();
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Add New Task</ModalHeader>
//         <ModalBody>
//           <FormControl mb={4}>
//             <FormLabel>Title</FormLabel>
//             <Input
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Task Title"
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Description</FormLabel>
//             <Textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Task Description"
//             />
//           </FormControl>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
//             Add
//           </Button>
//           <Button variant="ghost" onClick={onClose}>
//             Cancel
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default TaskAddModal;

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
  Button,
} from "@chakra-ui/react";

const TaskAddModal = ({
  isOpen,
  onClose,
  onAddTask,
  onEditTask,
  isEditing,
  task,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (isEditing && task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [isEditing, task]);

  const handleSaveOrAddTask = () => {
    if (isEditing && task) {
      onEditTask({ ...task, title, description });
    } else {
      onAddTask({ title, description });
    }
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? "Edit Task" : "Add New Task"}</ModalHeader>
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task Title"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task Description"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSaveOrAddTask}>
            {isEditing ? "Save" : "Add"}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskAddModal;
