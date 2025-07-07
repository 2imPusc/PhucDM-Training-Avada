const fs = require('fs');
const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');
const products = [];

for (let i = 0; i < 1000; i++) {
    const product = {
        id: uuidv4(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        product: faker.commerce.product(),
        color: faker.color.human(),
        createdAt: faker.date.past(),
        image: faker.image.url({ width: 640, height: 480 })
    }

    products.push(product);
}

fs.writeFileSync('products.json', JSON.stringify({ data : products }, null, 2), 'utf8');