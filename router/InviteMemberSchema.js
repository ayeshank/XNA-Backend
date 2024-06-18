const mongoose= require('mongoose');

const inviteMemberSchema=new mongoose.Schema({
    invitoremail:{
    type:String,
    required:true
    },
    invitedemail:{
    type:String,
    required:true
    },
    singupotp:{
    type:Number,
    required:true,
    },  
});
const InviteMember= new mongoose.model('InviteMember',inviteMemberSchema);
module.exports=InviteMember;
