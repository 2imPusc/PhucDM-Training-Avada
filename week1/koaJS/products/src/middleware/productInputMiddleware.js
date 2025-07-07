const yup = require('yup');

async function productInputMiddleware(ctx, next) {
    try {
        const newProductData = ctx.request.body;
        let schema = yup.object().shape({
            name: yup.string().required(),
            price: yup.number().positive().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            image: yup.string().url().required(),
        })
        await schema.validate(newProductData);
        next();
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: err.errors,
            errorName: err.name
        }
    }
}

module.exports = productInputMiddleware;