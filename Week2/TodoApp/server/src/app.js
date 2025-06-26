const Koa = require('koa');
const koaBody = require('koa-body');
const routes = require('./routes/todoRoutes.js');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors({
    origin: '*', 
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowHeaders: ['Content-Type', 'Authorization'], 
}));

app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});