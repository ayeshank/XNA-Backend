const mongoose= require('mongoose');

const audLogSchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },
  CRSA:{
    type:String,
    required:false 
  },
  XBA:{
    type:String,
    required:false 
  },  
  XSA:{
    type:String,
    required:false 
  },
  CPSA:{
    type:String,
    required:false 
  },
  audnet:{
    type:String,
    required:false 
  },
  audbal:{
    type:String,
    required:false 
  },
  xnabal:{
    type:String,
    required:false 
  },
  xnaaud:{
    type:String,
    required:false 
  }
});

const audLog= new mongoose.model('audLog',audLogSchema);
module.exports=audLog;