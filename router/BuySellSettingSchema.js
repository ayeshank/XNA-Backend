const mongoose= require('mongoose');

const buysellSetSchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },
  adminname:
  {
      type:String,
      required:false  
  },
  adminno:
  {
      type:String,
      required:false  
  },
  BLFAAUD:{
    type:String,
    required:false 
  }, 
  BLP:{
    type:String,
    required:false 
  }, 
  SLP:{
    type:String,
    required:false 
  }, 
  MBL:{
    type:String,
    required:false 
  }, 
  MSL:{
    type:String,
    required:false 
  }, 
});

const buysellSet= new mongoose.model('buysellSet',buysellSetSchema);
module.exports=buysellSet;