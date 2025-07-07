/**
 * Sorts a list of products by the `createdAt` field.
 * 
 * @param {Array<Object>} products - The array of products to be sorted.
 * @param {string} [orderBy='desc'] - The sorting order: `'asc'` for ascending * or `'desc'` for descending.
 * @returns {Array<Object>} - The sorted array of products.
 */
function sortByCreatedAt(products, orderBy = 'desc') {
    return products.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return orderBy === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    })
}

module.exports = sortByCreatedAt;