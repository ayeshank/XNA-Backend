const mongoose= require('mongoose');

const xnaLogSchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },
  memberno:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  surname:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  xnawithdraw:{
    type:String,
    required:true 
  },
  xnadeposit:{
    type:String,
    required:true 
  },  
  balance:{
    type:String,
    required:true 
  },
 
});

const xnaLog= new mongoose.model('xnaLog',xnaLogSchema);
module.exports=xnaLog;