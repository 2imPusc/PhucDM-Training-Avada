const yup = require('yup');

const todoSchema =yup.object().shape({
    title: yup.string().required(),
});

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
