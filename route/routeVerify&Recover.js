const express = require('express')
const router = express.Router();
const { verifyToken } = require('../utils/tokenUtils'); 
const { updateUserVerificationStatus, getUserByEmail } = require('../services/userService');
const { sendRecoveryEmail } = require('../services/emailService'); 
const { generateRecoveryToken } = require('../utils/tokenUtils'); 
const { updatePasswordResetToken } = require('../services/userService');
const { verifyToken } = require('../utils/tokenUtils');



router.get('/verify/:token', async (req, res) => {
    const verificationToken = req.params.token;
  
    try {
  
      const userEmail = verifyToken(verificationToken);
  
      const user = await getUserByEmail(userEmail);
      
      if (user) {
        if (!user.verified) {
          await updateUserVerificationStatus(user.id, true);
          res.status(200).json({ message: 'Email verified successfully.' });
        } else {
          res.status(400).json({ error: 'Email already verified.' });
        }
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      res.status(400).json({ error: 'Invalid or expired verification token.' });
    }
  });
   
router.post('/recover', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (user) {
      const recoveryToken = generateRecoveryToken(email);

      // Save the recovery token to the user in the database
      await updatePasswordResetToken(user.id, recoveryToken);

      // Send a password recovery email
      sendRecoveryEmail(email, recoveryToken);

      res.status(200).json({ message: 'Password recovery email sent.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error('Error requesting password recovery:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/reset-password/:token', async (req, res) => {
    const resetToken = req.params.token;
    const newPassword = req.body.newPassword;
  
    try {
  
      const userEmail = verifyToken(resetToken);
      const user = await getUserByPasswordResetToken(resetToken);
  
      if (user) {
        // Update the user's password and clear the recovery token
        await updatePassword(user.id, newPassword);
        res.status(200).json({ message: 'Password reset successfully.' });
      } else {
        res.status(404).json({ error: 'User not found or invalid token.' });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(400).json({ error: 'Invalid or expired recovery token.' });
    }
  });
  

module.exports = router;