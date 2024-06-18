const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');

const memberFeeSchema=new mongoose.Schema({
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
    AUD:{
    type:Number,
    required:false
    },
    CAD:{
    type:Number,
    required:false
    },
    CHF:{
    type:Number,
    required:false
    },
    EUR:{
    type:Number,
    required:false
    },
    GBP:{
    type:Number,
    required:false
    },
    KWD:{
    type:Number,
    required:false
    },
    TRY:{
    type:Number,
    required:false
    },
    USD:{
    type:Number,
    required:false
    },
    XNA:{
    type:Number,
    required:false
    },
    NewMembershipInvest:{
    type:Number,
    required:false
    },
    MonthlyMembershipFee:{
    type:Number,
    required:false
    },
});


const MemberFee= new mongoose.model('MemberFee',memberFeeSchema);
module.exports=MemberFee;