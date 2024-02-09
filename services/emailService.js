require('dotenv').config()
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({

  service: 'gmail',
  auth: {
    user:process.env.EMAIL_USER ,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendVerificationEmail(email, verificationToken) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verify Your Email',
    html: `<p>Click the following link to verify your email: <a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending verification email:', error);
    } else {
      console.log('Verification email sent:', info.response);
    }
  });
}

function sendRecoveryEmail(email, recoveryToken) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Recovery',
    html: `<p>Click the following link to recover your password: <a href="http://localhost:3000/reset-password/${recoveryToken}">Reset Password</a></p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending recovery email:', error);
    } else {
      console.log('Recovery email sent:', info.response);
    }
  });
}

module.exports = { sendVerificationEmail, sendRecoveryEmail };
