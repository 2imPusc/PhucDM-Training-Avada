const yup = require('yup');

const todoSchema =yup.object().shape({
    text: yup.string().required(),
});

/** 
 * Middleware to validate the input for creating a new todo item.
 * @param {Object} ctx - The Koa context object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} Calls the next middleware if validation passes, otherwise responds with an error.
 */
async function todoInputMiddleware(ctx, next) {
    try {
        const newTodoData = ctx.request.body;
        await todoSchema.validate(newTodoData);
        await next();
    } catch (error) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: error.errors,
        }
    }
}

module.exports = {
    todoInputMiddleware
};
