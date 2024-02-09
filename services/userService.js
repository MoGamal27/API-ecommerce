const client = require('../config/db')

async function updateUserVerificationStatus(userId, isVerified) {
  const query = {
    text: 'UPDATE users SET verified = $1 WHERE id = $2 RETURNING *',
    values: [isVerified, userId],
  };

  const result = await client.query(query);
  return result.rows[0];
}

async function getUserByEmail(email) {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  };

  const result = await client.query(query);
  return result.rows[0];
}


async function updatePasswordResetToken(userId, resetToken) {
    const query = {
      text: 'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
      values: [resetToken, userId],
    };
  
    const result = await pool.query(query);
    return result.rows[0];
  }
  
  module.exports = {  updateUserVerificationStatus, getUserByEmail, updatePasswordResetToken };
  
