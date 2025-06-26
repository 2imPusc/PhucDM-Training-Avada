import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [form, setForm] = useState({ text: "" });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.text) return;
    addTodo(form);
    setForm({ text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        className="input"
        value={form.text}
        onChange={handleChange}
        placeholder="Add a new todo"
      />
    </form>
  );
}

export default TodoForm;