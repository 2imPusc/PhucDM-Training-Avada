import { useState, useCallback } from 'react';
import { updateTodoAPi, deleteTodoApi, deleteManyTodosApi, updateManyTodosApi } from '../services/todoServices';


function useTodoActions({todos, setTodos, setSelectedItems}) {
  const [loadingButtons, setLoadingButtons] = useState({});
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((message, type) => {
    setToastMessage({message, type});
    setTimeout(() => setToastMessage(null), 2000);
  }, []);

  const updateLoadingState = (actionKey, isLoading) => {
    setLoadingButtons((prev) => ({
      ...prev,
      [actionKey]: isLoading
    }));
  };

  const handleAction = async (actionKey, callback) => {
    if (loadingButtons[actionKey]) return;
    updateLoadingState(actionKey, true);
    try {
      await callback();
    } catch (error) {
      console.error(`Failed to perform action ${actionKey}:`, error.message);
      showToast(`Failed to perform action: ${error.message}`, "error");
    } finally {
      setLoadingButtons(actionKey, false);
    }
  }

  const updateTodo = async (id) => {
    handleAction(`${id}`, async () => {
      setSelectedItems([]);
      const todo = todos.find(todo => todo.id === id);
      if (!todo) {
        showToast("Todo not found.", "error");
        return;
      }

      const updatedTodo = await updateTodoAPi(id, { isCompleted: !todo.isCompleted });
      setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
      showToast("Todo updated successfully.", "success");
    })
  };

  const deleteTodo = async (id) => {
    handleAction(`${id}`, async () => {
      setSelectedItems([]);
      await deleteTodoApi(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      showToast("Todo deleted successfully.", "success");
    })
  };

  const updateSelectedTodos = async (selectedItems, isCompleted) => {
    handleAction(`update-selected-${isCompleted}`, async () => {
      console.log("Selected items to update:", selectedItems);
      const { updatedTodos, failedIds } = await updateManyTodosApi(selectedItems, { isCompleted: isCompleted });
      const newTodos = todos.map( todo => {
        const updated = updatedTodos.find(u => u.id === todo.id);
        return updated ? { ...todo, isCompleted: updated.isCompleted } : todo;
      });
      setTodos(newTodos);
      setSelectedItems(failedIds);
      if (failedIds.length > 0) {
        showToast(`Failed to update ${failedIds.length} todos.`, "error");
      } else {
        showToast("Todos updated successfully.", "success");
      }
    });
  };

  const deleteSelectedTodos = async (selectedItems) => {
    handleAction(`delete-selected`, async () => {
      const { successIds, failedIds } = await deleteManyTodosApi(selectedItems);
      const newTodos = todos.filter(todo => !successIds.includes(todo.id));
      setTodos(newTodos);
      setSelectedItems(failedIds);
      if (failedIds.length > 0) {
        showToast(`Failed to delete ${failedIds.length} todos.`, "error");
      } else {
        showToast("Todos deleted successfully.", "success");
      }
    })
  };

  return {
    loadingButtons,
    toastMessage,
    setToastMessage,
    updateTodo,
    deleteTodo,
    updateSelectedTodos,
    deleteSelectedTodos,
  };
}

export default useTodoActions;