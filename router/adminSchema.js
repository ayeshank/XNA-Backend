const mongoose= require('mongoose');

const adminSchema=new mongoose.Schema({
    adminno:{
    type:String,
    required:true
    },
    adminpswd:{
    type:String,
    required:true,
    minlength:2,
    },
  adminname:{
    type:String,
    required:true
  },
  adminsurname:{
    type:String,
    required:true
  },
  
});
const Admin= new mongoose.model('Admin',adminSchema);
module.exports=Admin;
