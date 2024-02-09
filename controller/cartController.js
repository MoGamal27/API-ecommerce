const bodyParser = require('body-parser')
const {addItems, getItem} = require('../model/cartDb')

async function addNewItems(req,res){
    const {userId,productId,quantity} = req.body
     try{
        const newItem = await addItems(userId,productId,quantity)
        res.status(201).json(newItem)
     }catch(e){
        res.status(500).json(e)
     }

}

async function getCartItem(req,res){
    const userId = req.params.userId
    try{
        const cartItem = await getItem(userId)
        res.status(200).json(cartItem)
    }catch(e){
        res.status(500).json(e)
    }
}

module.exports = {
    addNewItems,
    getCartItem
}