const mongoose= require('mongoose');

const companyLogSchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },
  CMI:{
    type:String,
    required:false 
  },
  CRS:{
    type:String,
    required:false 
  },  
  CEI:{
    type:String,
    required:false 
  },
  CII:{
    type:String,
    required:false 
  },
  CO:{
    type:String,
    required:false 
  },
  CIA:{
    type:String,
    required:false 
  },
  CIRC:{
    type:String,
    required:false 
  },
  CIP:{
    type:String,
    required:false 
  },
  CPSP:{
    type:String,
    required:false 
  },
  CGBS:{
    type:String,
    required:false 
  },
  CPS:{
    type:String,
    required:false 
  },
  CN:{
    type:String,
    required:false 
  },
  CB:{
    type:String,
    required:false 
  }

});

const companyLog= new mongoose.model('companyLog',companyLogSchema);
module.exports=companyLog;