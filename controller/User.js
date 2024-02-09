const bodyParser = require('body-parser')
const checkRole = require('../middleware/chekRole')

const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../model/User');

async function createNewUser(req,res){
    const {username, email, password,role} = req.body;

    try{
        const newUser = await createUser(username,email,password,role)
        res.status(200).json(newUser);

    }catch(e){
        console.error('Error in POST /users:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getAllUsers(req,res){

    try{
        const allUsers = await getUsers();
        res.json(allUsers);
    }catch(e){
        console.error('Error in GET /users:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
    async function getSingleUser(req,res){
       const  userId = req.params.id;
        try{

            const singleUser =  await getUserById(userId)
            
            if(!singleUser){
                res.status(404).json({message:'User not found'})
            }else{
                res.status(200).json({singleUser})
            }
       
        }catch(e){
            console.error('Error in GETSINGlE /users:', e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } 

   async function UpdateUser(req,res){
    const userId = req.params.id;
    const {username,email,password,role} = req.body

    try{
        const update = await updateUser(userId,username,email,password,role)

        if(!updateUser){
            res.status(404).json({message:'User not found'})
        }else{
           res.status(200).json(update) 
        }

    }catch(e){
        console.error('Error in PUT /users:', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
   } 
   
   async function deleteSingleUser(req,res){
    const userId = req.params.id;

    try {
      const deletedUser = await deleteUser(userId);
  
      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.json({ message: 'User deleted successfully' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
   }

module.exports = {
    createNewUser,
    getAllUsers,
    getSingleUser,
    UpdateUser,
    deleteSingleUser
};
