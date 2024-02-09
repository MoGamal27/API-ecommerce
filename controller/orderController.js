const bodyParser = require('body-parser')
const {createOrder, getOrder} = require('../model/orderDb')

async function createNewOrder(req,res){
    const {userId, cartItems} = req.body
    
    try{
        const newOrder = await createOrder(userId, cartItems)
        res.status(200).json({message:'Order Created Success'})
    }catch(e){
        console.log(e)
        res.status(500).json({error:'Internal server error'})
    }
}

async function getOrderById(req,res){
    const userId = req.params.id
    
    try{
        const userOrder = await getOrder(userId)
        res.status(200).json(userOrder)
    }catch(e){
        console.log(e)
       res.status(500).json({error:'Internal server error'})
    }

}

module.exports = {
    createNewOrder,
    getOrderById
}