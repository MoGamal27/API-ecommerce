
const jwt = require('jsonwebtoken');
require('dotenv').config()


function generateVerificationToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET).userId;
}

function generateRecoveryToken(email) {
    return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' }); 
  }


module.exports = { generateVerificationToken, verifyToken, generateRecoveryToken };