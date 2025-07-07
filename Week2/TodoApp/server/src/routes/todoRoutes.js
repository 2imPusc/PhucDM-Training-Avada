const Router = require('koa-router');
const todoHandlers = require('../handlers/todoHandlers.js');
const { todoInputMiddleware } = require('../middlewares/todoInputMiddleware.js');
const router = new Router();

router.get('/api/todos', todoHandlers.getTodos);
router.post('/api/todos', todoInputMiddleware, todoHandlers.createTodo);
router.put('/api/todos/:id', todoHandlers.updateTodo);
router.delete('/api/todos/:id', todoHandlers.deleteTodo);

module.exports = router;