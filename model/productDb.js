const client = require('../config/db')

async function createProduct(name,price,stock){

 const query ='INSERT INTO products(name,price,stock) VALUES($1,$2,$3) RETURNING*';
 const values = [name,price,stock];

 const result = await client.query(query,values);

 return result.rows[0]
}

async function getProducts(){
  
   const result = await client.query('SELECT * FROM products')
   
   return result.rows
}

async function updateProduct(productId,name,price,stock){

    const query = 'UPDATE products SET name = $1, price = $2, stock = $3, WHERE id = $4 RETURNING*';
    const values  = [name,price,stock,productId]

    try {
        const result = await client.query(query, values);
    
        if (result.rows.length === 0) {
          return null;
        }
    
        return result.rows[0];
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
}

async function getSingleProduct(productId){
    
    const result = await client.query('SELECT * FROM products WHERE id = $1',[productId]);

    return result.rows[0]
}

async function deleteProduct (productId){
   
    const result = await client.query('DELETE FROM products WHERE id = $1 RETURNING *', [productId]);
      
      return result.rows[0];   
}

module.exports = {
    createProduct,
    getProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
