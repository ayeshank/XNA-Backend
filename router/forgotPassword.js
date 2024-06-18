const mongoose= require('mongoose');

const forgotPasswordSchema=new mongoose.Schema({
    email:{
    type:String,
    required:true
    },
    otp:{
    type:Number,
    required:true,
    },  
});
const ForgotPassword= new mongoose.model('ForgotPassword',forgotPasswordSchema);
module.exports=ForgotPassword;
