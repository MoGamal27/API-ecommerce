const  {createProduct,getProducts,getSingleProduct,updateProduct,deleteProduct} = require('../model/productDb')
const bodyParser = require('body-parser')

async function createNewProduct(req,res){
    const {name, price, stock} = req.body
   
    try{
        const newProduct = await createProduct(name,price,stock)
        res.status(200).json(newProduct)
    }
    catch(e){
        console.error('Error in POST /product:',e)
        res.status(500).json({error:'Internal Server Error'})
    }
}

async function getAllProducts(req,res){

    try{
        const allProducts = await getProducts()
        res.status(200).json(allProducts)
    }catch(e){
        console.error('Error in GET /products:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

async function getOneProduct(req,res){
   const productId = req.params.id
    
    try{
     const singleProduct = await getSingleProduct(productId)
     if(!singleProduct){
        res.status(404).json({message:'Product not found'})
    }else{
        res.status(200).json(singleProduct)
    }
}
catch(e){
    console.error('Error in GETSINGlE /product:', e);
    res.status(500).json({ error: 'Internal Server Error' });
}  
}
async function UpdateProducts(req,res){
    const productId = req.params.id;
    const {name,price,stock} = req.body

    try{
        const update = await updateProduct(productId,name,price,stock)

        if(!update){
            res.status(404).json({message:'Product not found'})
        }else{
           res.status(200).json(update) 
        }

    }catch(e){
        console.error('Error in PUT /products', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   } 
   
   async function deleteProudcts(req,res){
    const ProductId = req.params.id;

    try {
      const deletedProduct = await deleteProduct(ProductId);
  
      if (!deletedProduct) {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   }

module.exports = {
    createNewProduct,
    getAllProducts,
    getOneProduct,
    UpdateProducts,
    deleteProudcts
}
    
