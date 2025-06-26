import React, { useEffect, useState } from "react";
import "./App.css";
import Todo from "../Todo/Todo";
import TodoForm from "../TodoForm/TodoForm";
import { getAllTodoApi, addTodoApi, updateTodoAPi, deleteTodoApi } from "../../services/todoServices";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect( () => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodoApi();
        console.log("Fetched todos:", response);
        if (response) {
          setTodos(response);
        } else {
          console.error("No todos found");
        }
      } catch (error) {
        console.error("Failed to fetch todos:", error.message);
      }
    };
    fetchTodos();
  }, [])

  const addTodo = async (form) => {
    try {
      const newTodo = await addTodoApi(form);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Failed to add todo: ", error.message)
    }
  };

  const updateTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const updatedTodo = await updateTodoAPi(id, { isCompleted: !todo.isCompleted });
      setTodos(todos.map(t => t.id === id ? updatedTodo : t ));
    } catch (error) {
      console.error("Failed to update todo: ", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter( todo => todo.id !== id));
      console.log(`Todo ${id} deleted successfully`);
    } catch (error) {
      console.error("Failed to delete todo:", error.message);
    }
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map( todo => (
          <Todo
            key={todo.id}
            id={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            removeTodo={deleteTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;