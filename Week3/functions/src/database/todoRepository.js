// const fs = require('fs');
// const path = require('path');
// const dataPath = path.join(__dirname, 'todos.json');

// const {data: todos} = require('./todos.json');

// function getAll() {
//     return todos;
// }

// function update(id, updatedTodo) {
//     const index = todos.findIndex((todo) => todo.id === id);
//     if (index === -1) {
//         throw new Error('Todo not found');
//     }
//     todos[index] = {...todos[index], ...updatedTodo};
//     fs.writeFileSync(dataPath, JSON.stringify({data: todos}, null, 2), 'utf8');
//     return todos[index];
// }

// function add(newTodoData) {
//     const newTodo = {
//         id: todos.length > 0 ? todos[todos.length -1].id + 1 : 1,
//         ...newTodoData,
//         isCompleted: false,
//     };
//     todos.push(newTodo);
//     fs.writeFileSync(dataPath, JSON.stringify({data: todos}, null, 2), 'utf8');
//     return newTodo;
// }

// function remove(id) {
//     const index = todos.findIndex((todo) => todo.id === id);
//     if (index !== -1) {
//         todos.splice(index, 1);
//         fs.writeFileSync(dataPath, JSON.stringify({data: todos}, null, 2), 'utf8');
//         return true;
//     }

//     return false;
// }

// module.exports = {
//     getAll,
//     update,
//     add,
//     remove,
// };

const db = require('./firestore');
const TODOS_COLLECTION = 'todos';

async function getAll() {
  const snapshot = await db.collection(TODOS_COLLECTION).get();
  return snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
}

async function add(newTodoData) {
    const newTodo = {
        ...newTodoData,
        isCompleted: false,
    };
  const docRef = await db.collection(TODOS_COLLECTION).add(newTodo);
  const doc = await docRef.get();
  return {id: doc.id, ...doc.data()};
}

async function update(id, updatedFields) {
  const docRef = db.collection(TODOS_COLLECTION).doc(id);
  await docRef.update(updatedFields);
  const doc = await docRef.get();
  return {id: doc.id, ...doc.data()};
}

async function remove(id) {
  const docRef = db.collection(TODOS_COLLECTION).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;
  await docRef.delete();
  return true;
}

module.exports = {getAll, add, update, remove};
