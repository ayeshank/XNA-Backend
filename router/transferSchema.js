const mongoose= require('mongoose');

const transferSchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },


  PrevXnaBal:{
    type:String,
    required:false 
  },
  SendMemNo:{
    type:String,
    required:false 
  },
  SendMemName:{
    type:String,
    required:false 
  },
  SendMemSurname:{
    type:String,
    required:false 
  },
  SendDesc:{
      type:String,
      required:false
  },
  RecMemNo:{
    type:String,
    required:false 
  },
  RecMemName:{
    type:String,
    required:false 
  },
  RecMemSurname:{
    type:String,
    required:false 
  },
  RecDesc:{
    type:String,
    required:false
  },
  TxnaWithdraw:{
    type:String,
    required:false
  },
  TxnaDep:{
    type:String,
    required:false
  },
  BalOne:{
    type:String,
    required:false
  },
  BalTwo:{
    type:String,
    required:false
  }, 
 
});

const transfer= new mongoose.model('transfer',transferSchema);
module.exports=transfer;