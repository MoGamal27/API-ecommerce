const client = require('../config/db')
const bcrypt = require('bcrypt')


const saltRounds = 10;

async function registerUser(username,email,password,role,veified){

 const hashPassword = await bcrypt.hash(password,saltRounds)
     
  const query = 'INSERT INTO users(username,email,password,role,verified) VALUES($1,$2,$3,$4,$5) RETURNING*';
  const values = [username,email,hashPassword,role,veified];

  const result = await client.query(query, values);

  return result.rows
  
}
module.exports = registerUser
