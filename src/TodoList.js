import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton, Box, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { AddCircle as AddCircleIcon, Delete as DeleteIcon, Edit as EditIcon, Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon } from '@material-ui/icons';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      const date = new Date();
      setCurrentTime(date.toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const editTodo = (index, updatedValue) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedValue;
    setTodos(updatedTodos);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '1rem',
          background: theme.palette.background.default,
          color: theme.palette.text.primary,
        }}
      >
        <IconButton
          style={{ position: 'absolute', top: 10, right: 10, color: darkMode ? 'white' : 'black' }}
          onClick={toggleDarkMode}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <span
          style={{
            fontSize: '1.2rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          {currentTime}
        </span>
        <TextField
          label="New Todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={addTodo}>
          <AddCircleIcon />
          Add Todo
        </Button>
        <List>
          {todos.map((todo, index) => (
            <ListItem
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
              }}
            >
              <ListItemText primary={todo} />
              <div>
                <IconButton aria-label="Edit" onClick={() => editTodo(index, prompt('Update Todo', todo))}>
                  <EditIcon style={{ marginRight: '0.5rem' }} />
                </IconButton>
                <IconButton aria-label="Delete" onClick={() => deleteTodo(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
};

export default TodoList;
