const mongoose= require('mongoose');

const newMemberSchema=new mongoose.Schema({
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



  memberno:{
    type:String,
    required:true
  },
  


  TotPayAud:{
    type:String,
    required:false 
  }, 
  TotPayXna:{
    type:String,
    required:false 
  }, 




  InvestmentAud:{
    type:String,
    required:false 
  }, 
  InvestmentXna:{
    type:String,
    required:false 
  }, 




  MemFeeAud:{
    type:String,
    required:false 
  }, 
  MemFeeXna:{
    type:String,
    required:false 
  }, 




  RefPerLVL1:{
    type:String,
    required:false 
  }, 
  RefXnaLVL1:{
    type:String,
    required:false 
  }, 


  RefPerLVL2:{
    type:String,
    required:false 
  }, 
  RefXnaLVL2:{
    type:String,
    required:false 
  }, 

  RefPerLVL3:{
    type:String,
    required:false 
  }, 
  RefXnaLVL3:{
    type:String,
    required:false 
  }, 


  RefPerLVL4:{
    type:String,
    required:false 
  }, 
  RefXnaLVL4:{
    type:String,
    required:false 
  }, 


  RefPerLVL5:{
    type:String,
    required:false 
  }, 
  RefXnaLVL5:{
    type:String,
    required:false 
  }, 


  RefPerLVL6:{
    type:String,
    required:false 
  }, 
  RefXnaLVL6:{
    type:String,
    required:false 
  }, 

  RefPerLVL7:{
    type:String,
    required:false 
  }, 
  RefXnaLVL7:{
    type:String,
    required:false 
  }, 


  RefPerLVL8:{
    type:String,
    required:false 
  }, 
  RefXnaLVL8:{
    type:String,
    required:false 
  }, 


  RefPerLVL9:{
    type:String,
    required:false 
  }, 
  RefXnaLVL9:{
    type:String,
    required:false 
  }, 


  RefPerLVL10:{
    type:String,
    required:false 
  }, 
  RefXnaLVL10:{
    type:String,
    required:false 
  }, 

  RefPerLVL11:{
    type:String,
    required:false 
  }, 
  RefXnaLVL11:{
    type:String,
    required:false 
  }, 

  RefPerLVL12:{
    type:String,
    required:false 
  }, 
  RefXnaLVL12:{
    type:String,
    required:false 
  }, 




 CompanyMemIncomeAud:{
    type:String,
    required:false 
  },
  CompanyRefShareAud:{
    type:String,
    required:false 
  },


  CompanyProSharePer:{
    type:String,
    required:false 
  },

  CompanyGrossBefShareAud:{
    type:String,
    required:false 
  },
 
  CompanyProShareAud:{
    type:String,
    required:false 
  },


  CompanyNetAud:{
    type:String,
    required:false 
  },

  XnaBoughtAud:{
    type:String,
    required:false 
  },

  EndPeriodAudNet:{
    type:String,
    required:false 
  },

  EndPeriodAudBal:{
    type:String,
    required:false 
  },

  
  EndPeriodXnaBal:{
    type:String,
    required:false 
  },

  
  EndPeriodXnaAud:{
    type:String,
    required:false 
  },
  
  EndPeriodCompBal:{
    type:String,
    required:false 
  },


});

const newMember= new mongoose.model('newMember',newMemberSchema);
module.exports=newMember;