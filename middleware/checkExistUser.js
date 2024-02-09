const client = require('../config/db')


async function checkExistUser(email){
    const result = await client.query('SELECT * FROM users WHERE email = $1',[email]);
    
    return result.rows.length > 0;

}

module.exports = {checkExistUser};

