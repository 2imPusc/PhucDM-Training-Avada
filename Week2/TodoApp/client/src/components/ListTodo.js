import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  LegacyStack,
  Button,
  Badge
} from '@shopify/polaris';
import {useContext, useState} from 'react';
import TodoContext from '../context/TodoContext';

import {updateTodoAPi, deleteTodoApi} from '../services/todoServices'

function ListTodo() {
  const [selectedItems, setSelectedItems] = useState([]);
  const { todos, setTodos } = useContext(TodoContext); 
  
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

  function renderItem(todo) {
    const { id, text, isCompleted } = todo;

    return (
      <ResourceItem id={id}>
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              {text}
            </Text>
          </LegacyStack.Item>
          <Badge tone={isCompleted ? "success" : "attention"}>
            {isCompleted ? "complete" : "Incomplete"}
          </Badge>
          <Button
            size="slim"
            variant={isCompleted ? "secondary" : "primary"}
            onClick={() => updateTodo(id)}
          >
            {isCompleted ? "Undo Complete" : "Mark Complete"}
          </Button>
          <Button
            size="slim"
            tone="critical"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </Button>
        </LegacyStack>
      </ResourceItem>
    );
  }

  return (
    <LegacyCard>
      <ResourceList
        items={todos}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
    </LegacyCard>
  );
}

export default ListTodo;