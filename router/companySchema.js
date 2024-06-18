const mongoose= require('mongoose');

const companySchema=new mongoose.Schema({
  date:{
    type:Date,
    default:Date.now
  },


  PrevXnaBal:{
    type:String,
    required:false 
  },
  PrevAudBal:{
    type:String,
    required:false 
  },  
  PrevCompanyBal:{
    type:String,
    required:false 
  },

  PrevXnaAud:{
    type:String,
    required:false 
  },
  
  CompanyInterestIncomeAud:{
    type:String,
    required:false 
  },
  CompanyOutgoingsAud:{
    type:String,
    required:false 
  },
  CompanyInvestAmountAud:{
    type:String,
    required:false 
  },
  CompanyInvestReturnCapitalAud:{
    type:String,
    required:false 
  },
  CompanyInvestProfitAud:{
    type:String,
    required:false 
  },
 

  CompanyProfitSharePer:{
    type:String,
    required:false 
  },

  CompanyGrossBeforeShareAud:{
    type:String,
    required:false 
  },
  CompanyProfitShareAud:{
    type:String,
    required:false 
  },
  CompanyNetAud:{
    type:String,
    required:false 
  },
  CompanyBal:{
    type:String,
    required:false 
  },
  AudBal:{
    type:String,
    required:false 
  },
  XnaBal:{
    type:String,
    required:false 
  },
  XNAAUD:{
    type:String,
    required:false 
  },
 
});

const company= new mongoose.model('company',companySchema);
module.exports=company;