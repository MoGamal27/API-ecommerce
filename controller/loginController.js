const loginUser = require('../model/loginDb')
const jwt = require('jsonwebtoken')
const cookieParser= require('cookie-parser')
require('dotenv').config()
async function login(req,res){
    const { email, password } = req.body;
     
    if(!email || !password){
      res.status(400).json({error:'All feilds required'})
   }

  try {
   
    const user = await loginUser(email, password);

    if (user) {
        const token = jwt.sign({userId:user.id, role:user.role}, process.env.JWT_SECRET, {
          expiresIn:'5d'
        })
        res.cookie('authToken',token,{
          httpOnly:true,
          secure:true,
          maxAge:7 * 24 * 60 * 60 * 1000,
         })
      
      res.status(200).json({ message: 'Login successful', token})
    } else {
      res.status(401).json({ error: 'Invalid email or password' })
    }
  }catch (error) {
    console.error('Error in POST login', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { login };
