import {
  Box,
  Flex,
  Grid,
  GridItem,
  Button,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Checkbox,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Navbar from "../components/Navbar";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    status: false,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  let nextId = todos.length
    ? Math.max(...todos.map((todo) => todo._id)) + 1
    : 1;

  const handleAddTodo = () => {
    const todo = { ...newTodo, _id: nextId++ };
    setTodos([...todos, todo]);
    setNewTodo({ title: "", description: "", status: false });
    onClose();
    toast({
      title: "Todo added.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
    onOpen();
  };

  const handleUpdateTodo = () => {
    setTodos(
      todos.map((todo) => (todo._id === currentTodo._id ? currentTodo : todo))
    );
    setCurrentTodo(null);
    setIsEditing(false);
    onClose();
    toast({
      title: "Todo updated.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    toast({
      title: "Todo deleted.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleStatusChange = (id, status) => {
    setTodos(
      todos.map((todo) => (todo._id === id ? { ...todo, status } : todo))
    );
  };

  return (
    <>
      <Navbar />
      <Box w="100%" p={4} mx="auto" mt={20}>
        <Text fontSize="3xl" fontWeight={"bold"} textAlign="center" color={"aliceblue"}>
          Todo List 📝
        </Text>
        {todos.length === 0 ? (
          <Flex direction="column" align="center" fontSize={"3xl"}  mt={4} color={"aliceblue"}>
            <Text>No todos found</Text>
          </Flex>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={4}
            mt={4}
          >
            {todos.map((todo) => (
              <GridItem key={todo._id}>
                <Box
                  p={4}
                  bg={"white"}
                  borderRadius="10px"
                  boxShadow="rgba(89, 69, 59, 0.1) 0px 2px 8px 0px"
                  _hover={{
                    transform: "scale(1.02)",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                  }}
                  transition="all 0.3s ease-in-out"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "150px",
                  }}
                >
                  <Text fontWeight="bold">Title: {todo.title}</Text>
                  <Text mt={2}>Description: {todo.description}</Text>
                  <Flex mt={2} alignItems="center">
                    <Checkbox
                      isChecked={todo.status}
                      onChange={() =>
                        handleStatusChange(todo._id, !todo.status)
                      }
                    />
                    <Text ml={2}>
                      {todo.status ? "Completed" : "Incompleted"}
                    </Text>
                  </Flex>
                  <Flex mt={2} justifyContent="right" gap={5}>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={() => handleEditTodo(todo)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Box>
              </GridItem>
            ))}
          </Grid>
        )}
        <Flex direction="column" align="center" mt={4}>
          <Button colorScheme="orange" onClick={onOpen}>
            Add New Todo
          </Button>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              {isEditing ? "Edit Todo" : "Add New Todo"}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={isEditing ? currentTodo?.title || "" : newTodo.title}
                  onChange={(e) =>
                    isEditing
                      ? setCurrentTodo({
                          ...currentTodo,
                          title: e.target.value,
                        })
                      : setNewTodo({ ...newTodo, title: e.target.value })
                  }
                />
                <FormLabel mt={4}>Description</FormLabel>
                <Input
                  value={
                    isEditing
                      ? currentTodo?.description || ""
                      : newTodo.description
                  }
                  onChange={(e) =>
                    isEditing
                      ? setCurrentTodo({
                          ...currentTodo,
                          description: e.target.value,
                        })
                      : setNewTodo({ ...newTodo, description: e.target.value })
                  }
                />
                <FormLabel mt={4}>Status</FormLabel>
                <Checkbox
                  isChecked={
                    isEditing ? currentTodo?.status || false : newTodo.status
                  }
                  onChange={(e) =>
                    isEditing
                      ? setCurrentTodo({
                          ...currentTodo,
                          status: e.target.checked,
                        })
                      : setNewTodo({ ...newTodo, status: e.target.checked })
                  }
                >
                  Completed
                </Checkbox>
              </FormControl>
              <Flex mt={4} justifyContent="left">
                {isEditing ? (
                  <Button colorScheme="blue" onClick={handleUpdateTodo}>
                    Update
                  </Button>
                ) : (
                  <Button colorScheme="teal" onClick={handleAddTodo}>
                    Add
                  </Button>
                )}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default Todos;
