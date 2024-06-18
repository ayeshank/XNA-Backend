const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');

require("dotenv").config();

const prefCurSchema=new mongoose.Schema({
  memberno:{
    type:Number,
    required:false
  },
  PCurr_One:{
    type:String,
    default:'AUD',
    required:false
  },
  PCurr_Two:{
    type:String,
    default:'Null',
    required:false
  },
  PCurr_Three:{
    type:String,
    default:'Null',
    required:false
  },
  PCurr_Four:{
    type:String,
    default:'Null',
    required:false
  },
  PCurr_Five:{
    type:String,
    default:'Null',
    required:false
  }
});

const PrefCurr= new mongoose.model('PrefCurr',prefCurSchema);
module.exports=PrefCurr;
