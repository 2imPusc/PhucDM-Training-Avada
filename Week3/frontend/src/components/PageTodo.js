import { useState } from 'react';
import { Page, Button, Modal, TextContainer, TextField } from '@shopify/polaris';
import ListTodo from './ListTodo'

function PageTodo({ todos, addTodo }) {
  const [form, setForm] = useState({ text: "" });
  const [active, setActive] = useState(false);

  const handleChangeValue = (field) => (value) => {
    setForm({
      ...form,
      [field]: value
    });
  };

  const handleChangeModal = () => {
    setActive(!active);
  }

  return (
    <Page
      title="Todo List"
      primaryAction={
        <Button onClick={handleChangeModal} variant="primary">Add</Button>
      }
    >
      <ListTodo todos={todos} />
      <Modal
          open={active}
          onClose={handleChangeModal}
          title="Create Todo"
          primaryAction={{
            content: 'Add',
            onAction: () => {
              if (form.text && form.text.trim()) {
                addTodo(form);
                setForm({ text: "" });
                handleChangeModal();
              }
            },
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
                value={form.text}
                onChange={handleChangeValue('text')}
                autoComplete="off"
              />
            </TextContainer>
          </Modal.Section>
        </Modal>
    </Page>
  );
}

export default PageTodo;