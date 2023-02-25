const router=require('express').Router();
const { error } = require('console');
const multer  = require('multer');
const path=require('path');
const Image=require('../config/model');
const mongoose=require('mongoose');




router.get('',(req,res)=>{
    res.render('homepage')
});

router.get('/upload',(req,res)=>{
    res.render('upload')
})



// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './images',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('image');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


router.post('/upload',(req,res)=>{
      upload(req, res, (err) => {
    if(err){
      res.send('error occoured')
    } else {
      if(req.file == undefined){
        res.send('no file selected')
      } else {
        
        console.log(`${req.file.destination}/${req.file.filename} `);
        const image = new Image({
          src:`${req.file.destination}/${req.file.filename} `
         });
         image.save((err) => {
          if(err){
            res.send('sorry couldnot save');
          }
          res.send('image src uploaded')

        })

      }
    }
  });
});  
//upload varriable



module.exports=router;