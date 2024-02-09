const client = require('../config/db')
const bcrypt = require('bcrypt')

async function loginUser(email,password){
      
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);

  if (result.rows.length > 0) {
    const user = result.rows[0];

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
  
      return user;
    }
  }

  return null;
} catch (error) {
  console.error('Error in loginUser:', error);
  throw error;
}
} 

module.exports = loginUser;