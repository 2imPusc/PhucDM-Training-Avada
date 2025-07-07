import { useState, useEffect } from 'react';
import { Page, Button, Modal, TextContainer, TextField } from '@shopify/polaris';
import ListTodo from '../components/ListTodo'
import { addTodoApi, getAllTodoApi } from '../services/todoServices';

function PageTodo() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({ title: "" });
  const [active, setActive] = useState(false);

  useEffect( () => {
    const fetchTodos = async () => {
      try {
        const response = await getAllTodoApi();
        console.log("Fetched todos:", response);
        setTodos(response);
      } catch (error) {
        console.error("Failed to fetch todos:", error.message);
      }
    };
    fetchTodos();
  }, []);

  const handleChangeValue = (field) => (value) => {
    setForm(prevForm => ({
      ...prevForm,
      [field]: value
    }));
  };

  const handleChangeModal = () => {
    setActive(prev => !prev);
  }

  const addTodo = async (form) => {
    if (loading) return;
    setLoading(true);
    try {
      const newTodo = await addTodoApi(form);
      setTodos(prev => [...prev, newTodo]);
      setForm({ title: "" });
      setActive(false);
    } catch (error) {
      console.error("Failed to add todo: ", error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page
      title="Todo List"
      primaryAction={
        <Button onClick={handleChangeModal} variant="primary">Add</Button>
      }
    >
      <ListTodo todos={todos} setTodos={setTodos} />
      <Modal
          open={active}
          onClose={handleChangeModal}
          title="Create Todo"
          primaryAction={{
            content: 'Add',
            onAction: () => addTodo(form),
            loading: loading,
            disabled: loading || !form.title.trim()
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleChangeModal,
            },
          ]}
        >
          <Modal.Section>
            <TextContainer>
              <TextField
                label="Title"
                value={form.title}
                onChange={handleChangeValue('title')}
                autoComplete="off"
              />
            </TextContainer>
          </Modal.Section>
        </Modal>
    </Page>
  );
}

export default PageTodo;