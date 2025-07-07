const { getAll, update, add, remove } = require('../database/todoRepository');

/**
 * Get the list of all todos and return via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the list of todos.
 */
async function getTodos(ctx) {
    try {
        const todos = await getAll();
        ctx.body = {
            data: todos
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        };
    }
}

/**
 * Create a new todo and return it via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the newly created todo.
 */
async function createTodo(ctx) {
    try {
        const newTodoData = ctx.request.body;
        const newTodo = await add(newTodoData);
        ctx.status = 201;
        ctx.body = {
            success: true,
            data: newTodo
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        };
    }
}

/**
 * Update a todo by id and return the updated todo via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response containing the updated todo.
 */
async function updateTodo(ctx) {
    try {
        const id = ctx.params.id;
        const updatedData = ctx.request.body;
        const updatedTodo = await update(id, updatedData);
        ctx.body = { 
            success: true, 
            data: updatedTodo 
        };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { 
            success: false, 
            error: error.message 
        };
    }
}

/**
 * Delete a todo by id via HTTP.
 * @async
 * @param {Object} ctx - Koa context object.
 * @returns {Promise<void>} Returns a response indicating the result of the deletion.
 */
async function deleteTodo(ctx) {
    try {
        const id = ctx.params.id;
        await remove(id);
        ctx.status = 200;
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: error.message
        };
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};