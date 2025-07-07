const db = require('./firestore');
const TODOS_COLLECTION = 'todos';

/**
 * Get all todos from Firestore.
 * @async
 * @return {Promise<Array<Object>>} A promise that resolves to an array of todo objects.
 */
async function getAll() {
  const snapshot = await db.collection(TODOS_COLLECTION).get();
  console.log('Firestore snapshot docs:', snapshot.docs.length);
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

/**
 * Add a new todo to Firestore.
 * @async
 * @param {Object} newTodoData - The data for the new todo.
 * @return {Promise<Object>} A promise that resolves to the newly added todo object.
 */
async function add(newTodoData) {
    const newTodo = {
        ...newTodoData,
        isCompleted: false,
    };
  const docRef = await db.collection(TODOS_COLLECTION).add(newTodo);
  const doc = await docRef.get();
  return {id: doc.id, ...doc.data()};
}

/**
 * Update a todo by ID in Firestore.
 * @async
 * @param {string} id - The ID of the todo to update.
 * @param {Object} updatedFields - The fields to update.
 * @return {Promise<Object>} A promise that resolves to the updated todo object.
 */
async function update(id, updatedFields) {
  const docRef = db.collection(TODOS_COLLECTION).doc(id);
  await docRef.update(updatedFields);
  const doc = await docRef.get();
  return {id: doc.id, ...doc.data()};
}

/**
 * Remove a todo by ID from Firestore.
 * @async
 * @param {string} id - The ID of the todo to remove.
 * @return {Promise<boolean>} A promise that resolves to true if deleted, or false if not found.
 */
async function remove(id) {
  const docRef = db.collection(TODOS_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;
  await docRef.delete();
  return true;
}

module.exports = {getAll, add, update, remove};
