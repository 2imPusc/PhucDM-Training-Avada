const { getAll, update, add, remove } = require('../database/todoRepository');

async function getTodos(ctx) {
    try {
        const todos = getAll();
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

async function createTodo(ctx) {
    try {
        const newTodoData = ctx.request.body;
        const newTodo = add(newTodoData);
        ctx.status = 201;
        ctx.body = {
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

async function updateTodo(ctx) {
    try {
        const id = parseInt(ctx.params.id);
        const updatedData = ctx.request.body;
        const updatedTodo = update(id, updatedData);
        ctx.body = {
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

async function deleteTodo(ctx) {
    try {
        const id = parseInt(ctx.params.id, 10);
        const isDeleted = remove(id);
        if (isDeleted) {
            ctx.status = 204;
            console.log(`Todo ${id} deleted successfully`);
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                error: 'Todo not found'
            };
        }
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