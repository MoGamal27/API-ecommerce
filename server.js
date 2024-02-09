const express = require('express');
const bodyParser = require('body-parser');

const routeUser = require('../UserManagement/route/routeUser')
const routeAuth = require('../UserManagement/route/routeAuth')
const roteProduct = require('../UserManagement/route/routeProduct')
const routeOrder = require('../UserManagement/route/routeOrder')
const routeCart = require('../UserManagement/route/routeCart')
const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use('/',routeUser,roteProduct,routeOrder,routeCart);
app.use('/auth',routeAuth);


app.listen(4000,()=>{
    console.log('listining port 4000');
})