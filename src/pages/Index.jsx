import { useState } from 'react';
import { Box, Button, Container, Flex, Input, List, ListItem, Text, useToast } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={8} justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
      </Flex>
      <Box as="section" mb={6}>
        <Flex mb={4}>
          <Input
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <Button onClick={addTask} ml={2} colorScheme="blue">
            <FaPlus />
          </Button>
        </Flex>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center" p={2} boxShadow="md">
              <Text flex="1">{task.text}</Text>
              <Button size="sm" onClick={() => editTask(task.id, prompt('Edit task:', task.text))} mr={2}>
                <FaEdit />
              </Button>
              <Button size="sm" onClick={() => deleteTask(task.id)} colorScheme="red">
                <FaTrash />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default Index;