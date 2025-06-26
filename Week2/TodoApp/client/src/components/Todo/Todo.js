function Todo({ todo, id, updateTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => updateTodo(id)}>
          {todo.isCompleted ? "Undo Complete" : "Complete"}
        </button>
        <button onClick={() => removeTodo(id)}>x</button>
      </div>
    </div>
  );
}

export default Todo;