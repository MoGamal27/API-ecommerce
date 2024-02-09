const client = require('../config/db')
const bcrypt = require('bcrypt')

const saltRounds = 10;

async function createUser (username, email, password,role = 'admin'){

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const query = 'INSERT INTO users (username, email, password, role) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [username,email,hashPassword,role];

    const result = await client.query(query, values)
               
     return result.rows;
}

async function getUsers (){
    
    const result = await client.query('SELECT * FROM users ');

    return result.rows;
}

async function getUserById (userId){

    const result = await client.query('SELECT * FROM users WHERE id = $1',[userId]);
    
    return result.rows[0];
}


async function updateUser(userId, username, email, password,role = 'user') {
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const query = 'UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5 RETURNING *';
    const values = [username, email, hashPassword,role, userId];
  
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

async function deleteUser (userId){
   
    const result = await client.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
 
    if (result.rows.length === 0)
        return null;
      
      return result.rows[0];   
}

module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};