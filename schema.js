const mongoose= require('mongoose');
const jwt=require('jsonwebtoken');

require("dotenv").config();

const memberSchema=new mongoose.Schema({
  id:{
    type:String,
    unique:true
  },
  refmno:{
    type:Number,
    required:true,
    unique:false
  },
  name:{
    type:String,
    required:true
  },
  surname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true
  },
  address:{
    type:String,
    required:true,
  },
  postcode:{ 
    type:Number,
    required:true
    },
  state:{
    type:String,
    required:true,
  },
  country:{
    type:String,
    required:true,
  },
  bankaccinfo:{
    type:String,
    required:true,
  },
  date:{
    type:Date,
    default:Date.now
  },
  memberno:{
    type:Number,
    required:false
  },
  password:{
    type:String,
    required:false,
    minlength:2,
  },
  payAud:{
    type:Number,
    required:false,
  },
  category:{
    type:String,
    default:'Member',
    required:false,
  }
  // tokens:[
  //   {
  //     token:{
  //       type:Number,
  //       required:false,
  //     }
  //   }
  // ]
});

// memberSchema.methods.generateAuthToken = async function(){
//   try{
//   let tokendev=jwt.sign({_id:this._id},process.env.SECRET_KEY);
//   console.log(_id);
//   this.tokens=this.tokens.concat({token:tokendev})
//   this.save();
//   return token;
//   }
//   catch(err){
//     console.log(err);
//   }
// }

const Member= new mongoose.model('Member',memberSchema);
module.exports=Member;
