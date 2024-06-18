const mongoose= require('mongoose');

const compInpSetSchema=new mongoose.Schema({
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
  InIncA:{
    type:String,
    required:false 
  }, 
  CompOutA:
  {
    type:String,
    required:false 
  }, 
  CompInvestAmA:{
    type:String,
    required:false 
  }, 
  CompInvestRetCapA:
  {
    type:String,
    required:false 
  }, 
  CompInvestProA:{
    type:String,
    required:false 
  }
});

const compInpSet= new mongoose.model('compInpSet',compInpSetSchema);
module.exports=compInpSet;