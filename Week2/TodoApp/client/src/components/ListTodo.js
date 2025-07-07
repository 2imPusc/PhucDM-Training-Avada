import React, { useState } from 'react';
import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  LegacyStack,
  Button,
  Badge,
  InlineStack,
  Card,
  Box,
  Toast
} from '@shopify/polaris';
import useTodoActions from '../hooks/useTodoActions';

function ListTodo({ todos, setTodos }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const { loadingButtons, toastMessage, setToastMessage, updateTodo, deleteTodo, updateSelectedTodos, deleteSelectedTodos } = useTodoActions({todos, setTodos, setSelectedItems});

  function renderItem(todo) {
    const { id, title, isCompleted } = todo;

    return (
      <ResourceItem id={id}>
        <LegacyStack alignment="center">
          <LegacyStack.Item fill>
            <Text variant="bodyMd" fontWeight="bold" as="h3">
              {title}
            </Text>
          </LegacyStack.Item>
          <Badge tone={isCompleted ? "success" : "attention"}>
            {isCompleted ? "completed" : "Incomplete"}
          </Badge>
          <Button
            size="slim"
            variant={isCompleted ? "secondary" : "primary"}
            onClick={(e) => {
              e.stopPropagation();
              updateTodo(id);
            }}
            disabled={loadingButtons[`${id}`]}
          >
            {isCompleted ? "Undo Complete" : "Mark Complete"}
          </Button>
          <Button
            size="slim"
            tone="critical"
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(id);
            }}
            disabled={loadingButtons[`${id}`]}
          >
            Delete
          </Button>
        </LegacyStack>
      </ResourceItem>
    );
  }

  return (
    <React.Fragment>
      <LegacyCard>
        <ResourceList
          items={todos}
          renderItem={renderItem}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          persistActions
          selectable
          />
      </LegacyCard>
      { selectedItems.length > 0 && 
        <LegacyStack 
          alignment="center" 
          distribution="center"
        >
          <Box paddingBlockStart='400'>
            <Card>
              <InlineStack gap="400">
              <Button
                size="slim"
                tone="success"
                variant="primary"
                disabled={selectedItems.length === 0}
                onClick={() => updateSelectedTodos(selectedItems, true)}
                loading={loadingButtons["update-selected-true"]}
                >
                Complete
              </Button>
              <Button
                size="slim"
                disabled={selectedItems.length === 0}
                onClick={() => updateSelectedTodos(selectedItems, false)}
                loading={loadingButtons["update-selected-false"]}
                >
                Incomplete
              </Button>
              <Button
                size="slim"
                tone="critical"
                disabled={selectedItems.length === 0}
                onClick={() => deleteSelectedTodos(selectedItems)}
                loading={loadingButtons["delete-selected"]}
                >
                Delete Selected
              </Button>
              </InlineStack>
            </Card>
          </Box>
        </LegacyStack>
      }
      {toastMessage && (
        <Toast 
          content={toastMessage.message} 
          onDismiss={() => setToastMessage(null)}  
          error={toastMessage.type === 'error' ? true : false}
          tone="magic"
        />
      )}
    </React.Fragment>
  );
}

export default ListTodo;