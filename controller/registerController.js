
const registerUser = require('../model/registerDb')
const {checkExistUser} = require('../middleware/checkExistUser')
const { sendVerificationEmail } = require('../services/emailService'); // Implement email sending service
const { generateVerificationToken } = require('../utils/tokenUtils');

async function register(req,res){
 const {username,email,password,role} = req.body

 if(!username || !email || !password){
    res.status(400).json({error:'All feilds required'})
 }

 if(password.length < 6){
    return res.status(400).json({message:'password less than 6 characters'});
}
    
   try{

     const foundUser = await checkExistUser(email)

      if(foundUser){
        return res.status(400).json({error:'User aleardy exist'})
      }

       // Generate a verification token
    const verificationToken = generateVerificationToken(email);

    // Save user to the database with a verification status of false
    const newUser = await registerUser(username, email, password, role, false);

    // Send a verification email
    sendVerificationEmail(email, verificationToken);

    res.status(200).json({ message: 'User registered. Check your email for verification.' });
  } catch (e) {
    console.error('Error in POST register', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }

   /* const newUser = await registerUser(username,email,password,role)
        res.status(200).json(newUser);

    }catch(e){
        console.error('Error in POST register', e);
        res.status(500).json({ error: 'Internal Server Error' });
    }*/
   }

   module.exports = {register}
   
