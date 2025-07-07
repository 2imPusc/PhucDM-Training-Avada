const API_URL = 'http://127.0.0.1:5001/koa-function-42085/us-central1/api/api/todos';

/** * Fetch data from the API with error handling.
 * @param {string} url - The API endpoint to fetch data from.
 * @param {Object} [options={}] - Optional fetch options (method, headers, body, etc.).
 * @returns {Promise<Object>} Returns a promise that resolves to the data from the API.
 * @throws {Error} Throws an error if the fetch fails or if the response is not ok.
 */
async function fetchApi(url, options = {}) {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || `HTTP error: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (err) {
    console.error('Fetch API Error:', err.message);
    throw err;
  }
}

/**
 * Fetch all todos from the API.
 * @returns {Promise<Array>} Returns a promise that resolves to an array of todos.
 */
export async function getAllTodoApi() {
  return fetchApi(API_URL);
}

/** 
 * Add a new todo item.
 * @param {Object} todo - The todo item to add.
 * @returns {Promise<Object>} Returns a promise that resolves to the added todo item.
 */
export async function addTodoApi(todo) {
  return fetchApi(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todo),
  });
}

/**
 * Update a todo by id via the API.
 * @param {string|number} id - The id of the todo to update.
 * @param {object} updatedFields - The fields to update.
 * @returns {Promise<object>} A promise that resolves to the updated todo.
 */
export async function updateTodoAPi(id, updatedFields) {
  return fetchApi(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedFields)
  });
}

/**
 * Delete a todo by id via the API.
 * @param {string|number} id - The id of the todo to delete.
 * @returns {Promise<void>} A promise that resolves when the todo is deleted.
 */
export async function deleteTodoApi(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `HTTP error: ${res.status}`);
  }
}

/**
 * Delete multiple todos by their ids via the API.
 * @param {Array<string|number>} ids - Array of todo ids to delete.
 * @returns {Promise<{successIds: Array, failedIds: Array}>} A promise that resolves to 
 * an object containing arrays of successfully and unsuccessfully deleted ids.
 */
export async function deleteManyTodosApi(ids) {
  const results = await Promise.allSettled(ids.map(id => deleteTodoApi(id)));
  const successIds = ids.filter((_, idx) => results[idx].status === "fulfilled");
  const failedIds = ids.filter((_, idx) => results[idx].status === "rejected");
  return { successIds, failedIds };
}

/**
 * Update multiple todos by their ids via the API.
 * @param {Array<string|number>} ids - Array of todo ids to update.
 * @param {object} updateFields - The fields to update for each todo.
 * @returns {Promise<{updatedTodos: Array, failedIds: Array}>} A promise that resolves to 
 * an object containing updated todos and ids that failed to update.
 */
export async function updateManyTodosApi(ids, updateFields) {
  const results = await Promise.allSettled(ids.map(id => updateTodoAPi(id, updateFields)));
  const updatedTodos = results.map((res, idx) => (res.status === "fulfilled" ? res.value : null)).filter(Boolean);
  const failedIds = ids.filter((_, idx) => results[idx].status === "rejected");
  return { updatedTodos, failedIds };
}