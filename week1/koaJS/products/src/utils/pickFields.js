/**
 * Extracts specified fields from a product object.
 * 
 * @param {Object} product - The original product object containing all fields.
 * @param {string} fields - A comma-separated list of field names to extract (e.g., "id,name,price").
 * @returns {Object} - A new object containing only the specified fields.
 */
function pickFields (product, fields) {
    const selectedFields = fields.split(',');
    return selectedFields.reduce((obj, field) => {
        if (Object.prototype.hasOwnProperty.call(product, field)) {
            obj[field] = product[field];
        }
        return obj;
    }, {});
}

module.exports = pickFields;