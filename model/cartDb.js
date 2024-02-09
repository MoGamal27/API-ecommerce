const client = require('../config/db')

async function addItems(userId,productId,quantity){
    const query = 'INSERT INTO shopping_cart (user_id,product_id,quantity) VALUES($1,$2,$3) RETURNING*';
    const values = [userId,productId,quantity]

    const result = await client.query(query,values)
     return result.rows[0]
}

async function getItem(userId){
    const query = 'SELECT * FROM shopping_cart WHERE user_id = $1'[userId]
    const result = await client.query(query)

    return result.rows
}

module.exports = {
    addItems,
    getItem
}