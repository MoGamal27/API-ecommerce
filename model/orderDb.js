const client = require('../config/db')

async function createOrder(userId,cartItems){
    
    const orderResult = await client.query('INSERT INTO orders(user_id) VALUES($1) RETURNING id',[userId])
    const orderId = orderResult.rows[0].id;

    for(const cartItem of cartItems){
    const {product_id, quantity} = cartItem;
    
    await client.query('INSERT INTO order_items(order_id, product_id, quantity) VALUES($1,$2,$3)',
      [orderId, product_id, quantity]
    )

    await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [quantity, product_id]);
}
}

async function getOrder(userId){
    const result = await client.query('SELECT * FROM orders WHERE user_id = $1',[userId])
    return result.rows
}

module.exports = {
    createOrder,
    getOrder
};
