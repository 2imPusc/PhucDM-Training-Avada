const API_URL = 'http://localhost:5000/api/todos';

export async function getAllTodoApi() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data;
}

export async function addTodoApi(todo) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ ...todo })
  });
  const data = await res.json();
  return data.data;
}

export async function updateTodoAPi(id, updatedFields) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields)
  });
  const data = await res.json();
  return data.data;
}

export async function deleteTodoApi(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!res.ok) {
    throw new Error(`Error deleting todo with id ${id}`);
  }
}