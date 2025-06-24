const fs = require('fs');
const { faker } = require('@faker-js/faker');

const products = [];

for (let i = 0; i < 1000; i++) {
    const product = {
        id: i+1,
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        product: faker.commerce.product(),
        color: faker.color.human(),
        createdAt: faker.date.past(),
        image: faker.image.url(640, 480, 'technics', true)
    }

    products.push(product);
}

fs.writeFileSync('products.json', JSON.stringify({ data : products }, null, 2), 'utf8');