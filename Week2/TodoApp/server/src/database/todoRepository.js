const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dataPath = path.join(__dirname, 'todos.json');

/**
 * Read the list of todos from the JSON file.
 * @returns {Array<Object>} The list of todos.
 */
function readData () {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8')).data;
}

/**
 * Write the list of todos to the JSON file.
 * @param {Array<Object>} todos - The list of todos to write.
 */
function writeData (todos) {
    fs.writeFileSync(dataPath, JSON.stringify({data: todos}, null, 2), 'utf8');
}

/**
 * Get all todos.
 * @returns {Array<Object>} The list of todos.
 */
function getAll() {
    return readData();
}

/**
 * Add a new todo to the list.
 * @param {Object} newTodoData - The data of the new todo.
 * @returns {Object} The newly added todo.
 */
function add(newTodoData) {
    const todos = readData();
    const newTodo = {
        id: uuidv4(),
        ...newTodoData,
        isCompleted: false,
    };
    const newTodos = [...todos, newTodo];
    writeData(newTodos);
    return newTodo;
}

/**
 * Update a todo by ID.
 * @param {string} id - The ID of the todo to update.
 * @param {Object} updatedTodo - The updated data for the todo.
 * @returns {Object} The updated todo.
 * @throws {Error} If no todo with the given ID is found.
 */
function update(id, updatedTodo) {
    const todos = readData();
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (!todoToUpdate) {
        throw new Error('Todo not found');
    }
    const newTodos = todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo);
    writeData(newTodos); 
    return {...todoToUpdate, ...updatedTodo};
}

/**
 * Remove a todo by ID.
 * @param {string} id - The ID of the todo to remove.
 * @throws {Error} If no todo with the given ID is found.
 */
function remove(id) {
    const todos = readData();
    // const index = todos.findIndex(todo => todo.id === id);
    // if (index === -1) {
    //     throw new Error('Todo not found');
    // }
    // const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    const exists = todos.find(todo => todo.id === id);
    if (!exists) {
        throw new Error('Todo not found');
    }
    const newTodos = todos.filter(todo => todo.id !== id);
    writeData(newTodos);
}

module.exports = {
    getAll,
    update,
    add,
    remove
};