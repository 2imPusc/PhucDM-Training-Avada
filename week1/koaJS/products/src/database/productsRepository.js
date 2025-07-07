const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'products.json');

const { data : products } = require('./products.json');

function getAll() {
    return products;
}

function getOne(id, fields) {
    const product = products.find(product => product.id === parseInt(id));
    console.log('product: ', product);
    if (fields) {
        const selectedFields = fields.split(',');
        console.log('selectedFields: ', selectedFields);
        return selectedFields.reduce((obj, field) => {
            if (product[field]) {
                obj[field] = product[field];
            }
            return obj;
        }, {});
    }
    return product;
}

function getLimit(products, limit) {
    return products.slice(0, limit);
}

function sortByCreateAt (productsort = products, orderBy = 'desc') {
    return productsort.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return orderBy === 'asc' ? dateA - dateB : dateB - dateA;
    })
}

function createProd (product) {
    const newProduct = {
        id: products.length + 1,
        ...product, 
        createdAt: new Date().toISOString()
    }
    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify({ data: products }, null, 2), 'utf8');
    return newProduct;
}

function removeProd(id) {
    const index = products.findIndex(product => product.id === parseInt(id));
    console.log('index: ', index);
    if (index !== -1) {
        products.splice(index, 1);
        fs.writeFileSync(dataPath, JSON.stringify({ data: products }, null, 2), 'utf8');
        return true;
    }
    return false;   
}

function updatedProd (id, updatedData) {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        fs.writeFileSync(dataPath, JSON.stringify({ data: products }, null, 2), 'utf8');
        return products[index];
    }
    return null;
}

module.exports = {
    getAll,
    getOne,
    getLimit,
    sortByCreateAt,
    createProd,
    removeProd,
    updatedProd
};