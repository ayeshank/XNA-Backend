const mongoose= require('mongoose');

const compSetSchema=new mongoose.Schema({
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
  CompPSP:{
    type:String,
    required:false 
  }, 
  ExRate:{
    type:String,
    required:false 
  }, 
});

const compSet= new mongoose.model('compSet',compSetSchema);
module.exports=compSet;