const API_URL = 'http://127.0.0.1:5001/koa-function-42085/us-central1/api/api/todos';

export async function getAllTodoApi() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.data;
}

export async function addTodoApi(todo) {
  console.log(todo);
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