const mongoose= require('mongoose');

const buysellSchema=new mongoose.Schema({
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


  // xnadeposit:{
  //   type:String,
  //   required:false 
  // }, 




  MemBuyInXna:{
    type:String,
    required:false 
  }, 
  MemBuyInAud:{
    type:String,
    required:false 
  }, 



  MemSellInXna:{
    type:String,
    required:false 
  }, 
  MemSellInAud:{
    type:String,
    required:false 
  }, 


  MemBuyReelXna:{
    type:String,
    required:false 
  }, 
  MemBuyReelAud:{
    type:String,
    required:false 
  }, 


  MemSellReelXna:{
    type:String,
    required:false 
  }, 
  MemSellReelAud:{
    type:String,
    required:false 
  }, 



  PrevXnaAud:{
    type:String,
    required:false 
  },



  XnaAudBuyRate:{
    type:String,
    required:false 
  },
  XnaAudSellRate:{
    type:String,
    required:false 
  },




  BuyXnaDiffAud:{
    type:String,
    required:false 
  }, 
  SellXnaDiffAud:{
    type:String,
    required:false 
  }, 



  CompanyExchangeIncomeAud:{
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

  AudNet:{
    type:String,
    required:false 
  },

  CompanyBal:{
    type:String,
    required:false 
  },

  XnaBal:{
    type:String,
    required:false 
  },

  AudBal:{
    type:String,
    required:false 
  },

  XNAAUD:{
    type:String,
    required:false 
  },
 
});

const buysell= new mongoose.model('buysell',buysellSchema);
module.exports=buysell;