const express=require('express');
const router=require('./routes/index');
const app=express();
const multer  = require('multer')
const db=require('./config/database');
const Image=require('./config/model');

require('dotenv').config({path: './config/.env'})

app.use('/',router);

app.set('view engine', 'ejs');
app.use(express.static('public'));
db();


app.listen(3000,()=>console.log('server running on http://localhost:3000'))