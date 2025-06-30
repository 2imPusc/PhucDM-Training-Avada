import React, { useEffect, useContext } from "react";
import { Frame } from '@shopify/polaris';

import TopBarExample from './TopBarExample';
import PageTodo from "./PageTodo";
import { getAllTodoApi, addTodoApi } from "../services/todoServices";
import TodoContext from "../context/TodoContext";

function App() {
  const { todos, setTodos } = useContext(TodoContext);

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
      setTodos([
        ...todos,
        newTodo
      ]
      )
    } catch (error) {
      console.error("Failed to add todo: ", error.message)
    }
  };

  const logo = {
    topBarSource:
      'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
    width: 86,
    url: '#',
    accessibilityLabel: 'Shopify',
  };

  return (
    <Frame
    logo={logo}
    topBar={<TopBarExample/>}
    >
      <PageTodo todos={todos} addTodo={addTodo}/>
    </Frame>  
  );
}

export default App;