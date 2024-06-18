const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const Cookies = require("js-cookie");

// const conn=mongoose.connect("mongodb://localhost:27017/xnadb")
//     .then(() => {
//         console.log('Database connection successful')
//       })
//       .catch(err => {
//         console.error('Database connection error')
//       })
const conn = mongoose
  .connect(
    "mongodb+srv://ayesha_user-21:757001ank@cluster0.lvksl.mongodb.net/xnadb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.error("Database connection error");
  });

const Member = require("../schema.js");
const Admin = require("../router/adminSchema.js");
const xnaLog = require("../router/xnaLogSchema.js");
const referral = require("../router/referralSchema.js");
const MemberLog = require("../router/membersLog.js");
const buysell = require("../router/buysellSchema.js");
const audLog = require("../router/audLogSchema.js");
const companyLog = require("../router/companyLogSchema.js");
const newMember = require("../router/NewMemberSchema.js");
const companyCalc = require("../router/companySchema.js");
const MemberFee = require("../router/memberfeeSchema.js");
const refPay = require("../router/ReferralPaymentSchema.js");
const compSet = require("../router/CompSettingSchema.js");
const buysellSet = require("../router/BuySellSettingSchema.js");
const compInpSet = require("../router/compInputSetSchema.js");
const transfer = require("../router/transferSchema.js");
const ForgotPassword = require("../router/forgotPassword.js");
const InviteMember = require("../router/InviteMemberSchema.js");
const PrefCurr = require("../router/prefferedCurrencySchema.js");

//****************************************************************************************************/
//****************************************************************************************************/
//*****************************         UNIQUE MEMBER ID GENERATOR           *************************/
//****************************************************************************************************/
//****************************************************************************************************/
function memberIdGenerator(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************          SIGNUP ROUTE        *************************************/
//****************************************************************************************************/
//****************************************************************************************************/

var signuprefno = "";
router.post("/membersignup", async (req, res) => {
  const {
    id,
    refmno,
    name,
    surname,
    email,
    phone,
    address,
    postcode,
    state,
    country,
    bankaccinfo,
    memberno,
    password,
    payAud,
    category,
  } = req.body;

  if (
    !refmno ||
    !name ||
    !surname ||
    !email ||
    !phone ||
    !address ||
    !postcode ||
    !state ||
    !country ||
    !bankaccinfo ||
    !password ||
    !payAud
  ) {
    return res.status(422).json({ error: "Fill all Fields" });
  }
  Member.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "Email ALready Exist" });
      }
      let id_value = memberIdGenerator(24);
      const member = new Member({
        id: id_value,
        refmno,
        name,
        surname,
        email,
        phone,
        address,
        postcode,
        state,
        country,
        bankaccinfo,
        memberno,
        password,
        payAud,
        category,
      });
      member
        .save()
        .then(() => {
          signuprefno = refmno;
          req.session.membersno = memberno;
          signUppreferredCurrency(req, res); //Preffered Currency
          signUpReferralRoute(req, res); //Referral Members List
          res.status(201).json({ message: "Member Registered" });
        })
        .catch((err) => res.status(500).json({ error: "Failed to Signup" }));
    })
    .catch((err) => {
      console.log(err);
    });
});

var datem,
  nm02,
  nm03,
  nm04,
  nm05,
  nm16,
  nm17,
  nm18,
  nm19,
  nm20,
  nm21,
  nm25,
  nm26,
  nm30,
  nm31,
  nm35,
  nm36,
  nm40,
  nm41,
  nm40,
  nm45,
  nm46,
  nm50,
  nm51,
  nm55,
  nm56,
  nm60,
  nm61,
  nm65,
  nm66,
  nm70,
  nm71,
  nm75,
  nm76,
  nm80,
  nm81,
  nm82,
  nm83,
  nm84,
  nm85,
  nm86,
  nm87,
  nm88,
  nm89,
  nm90,
  nm91,
  nm92,
  nm93;

//SIGNUP NEWMEMBER ROUTE
const signUpNewMember = async (req, res) => {
  const xna = await xnaLog.findOne({}).sort({ $natural: -1 });
  const aud = await audLog.findOne({}).sort({ $natural: -1 });
  const company = await companyLog.findOne({}).sort({ $natural: -1 });
  const memberr = await Member.findOne({ memberno: req.session.membersno });
  const memberrfee = await MemberFee.findOne({}).sort({ $natural: -1 });
  const rf = await refPay.findOne({}).sort({ $natural: -1 });
  const cs = await compSet.findOne({}).sort({ $natural: -1 });
  datem = memberr.date;

  nm02 = (Math.floor(xna.balance * 1000000000) / 1000000000).toFixed(10);
  nm03 = parseFloat(aud.audbal).toFixed(2);
  nm04 = parseFloat(company.CB).toFixed(2);
  nm05 = (Math.floor(aud.xnaaud * 1000000000) / 1000000000).toFixed(10);

  nm18 = (parseFloat(memberr.payAud) - parseFloat(100)).toFixed(2); //Admin setting //Investment AUD
  nm20 = parseFloat(memberrfee.AUD).toFixed(2); //Admin setting //Membership fee AUD
  nm16 = parseFloat(memberr.payAud).toFixed(2); //Total Payment AUD
  nm19 = (
    Math.floor((parseFloat(nm18) / parseFloat(nm05)) * 1000000000) / 1000000000
  ).toFixed(10); //Investment XNA
  nm21 = (
    Math.floor((parseFloat(nm20) / parseFloat(nm05)) * 1000000000) / 1000000000
  ).toFixed(10); //Membership Fee (XNA)
  nm17 = (
    Math.floor((parseFloat(nm19) + parseFloat(nm21)) * 1000000000) / 1000000000
  ).toFixed(10); //Total Payment XNA

  nm25 = parseFloat(rf.RefPerLVL1 / 100);
  nm26 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm25) * 1000000000) / 1000000000
  ).toFixed(10);

  nm30 = parseFloat(rf.RefPerLVL2 / 100);
  nm31 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm30) * 1000000000) / 1000000000
  ).toFixed(10);

  nm35 = parseFloat(rf.RefPerLVL3 / 100);
  nm36 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm35) * 1000000000) / 1000000000
  ).toFixed(10);

  nm40 = parseFloat(rf.RefPerLVL4 / 100);
  nm41 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm40) * 1000000000) / 1000000000
  ).toFixed(10);

  nm45 = parseFloat(rf.RefPerLVL5 / 100);
  nm46 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm45) * 1000000000) / 1000000000
  ).toFixed(10);

  nm50 = parseFloat(rf.RefPerLVL6 / 100);
  nm51 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm50) * 1000000000) / 1000000000
  ).toFixed(10);

  nm55 = parseFloat(rf.RefPerLVL7 / 100);
  nm56 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm55) * 1000000000) / 1000000000
  ).toFixed(10);

  nm60 = parseFloat(rf.RefPerLVL8 / 100);
  nm61 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm60) * 1000000000) / 1000000000
  ).toFixed(10);

  nm65 = parseFloat(rf.RefPerLVL9 / 100);
  nm66 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm65) * 1000000000) / 1000000000
  ).toFixed(10);

  nm70 = parseFloat(rf.RefPerLVL10 / 100);
  nm71 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm70) * 1000000000) / 1000000000
  ).toFixed(10);

  nm75 = parseFloat(rf.RefPerLVL11 / 100);
  nm76 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm75) * 1000000000) / 1000000000
  ).toFixed(10);

  nm80 = parseFloat(rf.RefPerLVL12 / 100);
  nm81 = (
    Math.floor(parseFloat(nm21) * parseFloat(nm80) * 1000000000) / 1000000000
  ).toFixed(10);

  nm82 = parseFloat(nm20).toFixed(2);
  nm83 = (
    (parseFloat(nm26) +
      parseFloat(nm31) +
      parseFloat(nm36) +
      parseFloat(nm41) +
      parseFloat(nm46) +
      parseFloat(nm51) +
      parseFloat(nm56) +
      parseFloat(nm61) +
      parseFloat(nm66) +
      parseFloat(nm71) +
      parseFloat(nm76) +
      parseFloat(nm81)) *
    parseFloat(nm05)
  ).toFixed(2);

  nm84 = parseFloat(cs.CompPSP).toFixed(2);
  nm85 = (parseFloat(nm82) - parseFloat(nm83)).toFixed(2);
  nm86 = ((parseFloat(nm84) / 100) * parseFloat(nm85)).toFixed(2);

  nm87 = (parseFloat(nm85) - parseFloat(nm86)).toFixed(2);
  nm88 = parseFloat(nm18).toFixed(2);
  nm89 = (parseFloat(nm83) + parseFloat(nm86) + parseFloat(nm88)).toFixed(2);
  nm90 = (parseFloat(nm03) + parseFloat(nm89)).toFixed(2);
  nm91 = (
    Math.floor(
      (parseFloat(nm02) +
        parseFloat(nm17) -
        parseFloat(nm21) +
        parseFloat(nm26) +
        parseFloat(nm31) +
        parseFloat(nm36) +
        parseFloat(nm41) +
        parseFloat(nm46) +
        parseFloat(nm51) +
        parseFloat(nm56) +
        parseFloat(nm61) +
        parseFloat(nm66) +
        parseFloat(nm71) +
        parseFloat(nm76) +
        parseFloat(nm81)) *
        1000000000
    ) / 1000000000
  ).toFixed(10);
  nm92 = (
    Math.floor((parseFloat(nm90) / parseFloat(nm91)) * 1000000000) / 1000000000
  ).toFixed(10);
  nm93 = (parseFloat(nm04) + parseFloat(nm87)).toFixed(2);

  const newMem = new newMember({
    date: memberr.date,
    PrevXnaBal: nm02,
    PrevAudBal: nm03,
    PrevCompanyBal: nm04,
    PrevXnaAud: nm05,
    memberno: memberr.memberno,
    TotPayAud: nm16,
    TotPayXna: nm17,
    InvestmentAud: nm18,
    InvestmentXna: nm19,
    MemFeeAud: nm20,
    MemFeeXna: nm21,

    RefPerLVL1: nm25,
    RefXnaLVL1: nm26,
    RefPerLVL2: nm30,
    RefXnaLVL2: nm31,
    RefPerLVL3: nm35,
    RefXnaLVL3: nm36,
    RefPerLVL4: nm40,
    RefXnaLVL4: nm41,
    RefPerLVL5: nm45,
    RefXnaLVL5: nm46,
    RefPerLVL6: nm50,
    RefXnaLVL6: nm51,
    RefPerLVL7: nm55,
    RefXnaLVL7: nm56,
    RefPerLVL8: nm60,
    RefXnaLVL8: nm61,
    RefPerLVL9: nm65,
    RefXnaLVL9: nm66,
    RefPerLVL10: nm70,
    RefXnaLVL10: nm71,
    RefPerLVL11: nm75,
    RefXnaLVL11: nm76,
    RefPerLVL12: nm80,
    RefXnaLVL12: nm81,
    CompanyMemIncomeAud: nm82,
    CompanyRefShareAud: nm83,
    CompanyProSharePer: nm84,
    CompanyGrossBefShareAud: nm85,
    CompanyProShareAud: nm86,
    CompanyNetAud: nm87,
    XnaBoughtAud: nm88,
    EndPeriodAudNet: nm89,
    EndPeriodAudBal: nm90,
    EndPeriodXnaBal: nm91,
    EndPeriodXnaAud: nm92,
    EndPeriodCompBal: nm93,
  });

  newMem.save();

  // .then(()=>{

  signUpMemberLog(req, res); //MemberLog
  signUpCompanyLog(req, res); // CompanyLog
  signUpAudLog(req, res); //AUD Log
  signUpXnaLog(req, res); //XNA Log

  // res.status(201).json({message:"New Member REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered new member log"}))
};
router.post("/newmember", signUpNewMember);

//SIGNUP REFERRAL ROUTE
const signUpReferralRoute = async (req, res) => {
  const {
    memberno,
    rlvl1,
    rlvl2,
    rlvl3,
    rlvl4,
    rlvl5,
    rlvl6,
    rlvl7,
    rlvl8,
    rlvl9,
    rlvl10,
    rlvl11,
    rlvl12,
  } = req.body;
  var array = [];
  const refxna = await Member.find({ memberno: req.session.membersno });
  var newMemberNoReferral = refxna[0].refmno;
  array.push(newMemberNoReferral);

  for (var i = 0; i < 11; i++) {
    const b = await Member.find({ memberno: array.slice(-1) });
    if (b != null) {
      array.push(b[0].refmno);
    } else {
      array.push(array.slice(-1));
    }
  }
  const ref = new referral({
    memberno: req.session.membersno,
    rlvl1: array[0],
    rlvl2: array[1],
    rlvl3: array[2],
    rlvl4: array[3],
    rlvl5: array[4],
    rlvl6: array[5],
    rlvl7: array[6],
    rlvl8: array[7],
    rlvl9: array[8],
    rlvl10: array[9],
    rlvl11: array[10],
    rlvl12: array[11],
  });
  ref
    .save()
    .then(() => {
      signUpNewMember(req, res); //New Member Route
      // res.status(201).json({ message: "Referral Saved" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to store referral" })
    );
};
router.post("/referral", signUpReferralRoute);

//SIGNUP MEMBER ROUTE
const signUpMemberLog = async (req, res) => {
  const {
    date,
    memberno,
    refmno,
    name,
    surname,
    email,
    phone,
    address,
    postcode,
    state,
    country,
    bankaccinfo,
    feeAUD,
    feeXNA,
    rlvl1,
    rlvl2,
    rlvl3,
    rlvl4,
    rlvl5,
    rlvl6,
    rlvl7,
    rlvl8,
    rlvl9,
    rlvl10,
    rlvl11,
    rlvl12,
  } = req.body;
  const memdetail = await Member.findOne({ memberno: req.session.membersno });
  const refxna = await referral.findOne({ memberno: req.session.membersno });
  const ml = new MemberLog({
    date: memdetail.date,
    memberno: memdetail.memberno,
    refmno: memdetail.refmno,
    name: memdetail.name,
    surname: memdetail.surname,
    email: memdetail.email,
    phone: memdetail.phone,
    address: memdetail.address,
    postcode: memdetail.postcode,
    state: memdetail.state,
    country: memdetail.country,
    bankaccinfo: memdetail.bankaccinfo,
    feeAUD: nm20,
    feeXNA: nm21,
    // state:memdetail.state,country:memdetail.country,bankaccinfo:memdetail.bankaccinfo,feeAUD:120,feeXNA:1000,
    rlvl1: signuprefno,
    rlvl2: refxna.rlvl2,
    rlvl3: refxna.rlvl3,
    rlvl4: refxna.rlvl4,
    rlvl5: refxna.rlvl5,
    rlvl6: refxna.rlvl6,
    rlvl7: refxna.rlvl7,
    rlvl8: refxna.rlvl8,
    rlvl9: refxna.rlvl9,
    rlvl10: refxna.rlvl10,
    rlvl11: refxna.rlvl11,
    rlvl12: refxna.rlvl12,
  });
  ml.save();
  // .then(()=>{
  // res.status(201).json({message:"Member Log Registered"});
  // }).catch((err)=>res.status(500).json({error:"Failed to Register Member log"}))
};
router.post("/memberlog", signUpMemberLog);

//SIGNUP COMPANY LOG ROUTE
const signUpCompanyLog = async (req, res) => {
  const {
    date,
    CMI,
    CRS,
    CEI,
    CII,
    CO,
    CIA,
    CIRC,
    CIP,
    CPSP,
    CGBS,
    CPS,
    CN,
    CB,
  } = req.body;
  const cLog = new companyLog({
    date: datem,
    CMI: nm82,
    CRS: nm83,
    CEI: "0.00",
    CII: "0.00",
    CO: "0.00",
    CIA: "0.00",
    CIRC: "0.00",
    CIP: "0.00",
    CPSP: nm84,
    CGBS: nm85,
    CPS: nm86,
    CN: nm87,
    CB: nm93,
  });
  // const cLog= new companyLog({CMI:CMI,CRS:CRS,CEI:CEI,CII:CII,CO:CO,CIA:CIA,CIRC:CIRC,CIP:CIP,CPSP:CPSP,CGBS:CGBS,CPS:CPS,CN:CN,CB:CB});

  cLog.save();
  // .then(()=>{
  //     res.status(201).json({message:"COMPANY LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered company log"}))
};
router.post("/companylog", signUpCompanyLog);

//SIGNUP AUD LOG ROUTE
const signUpAudLog = async (req, res) => {
  const { date, CRSA, XBA, XSA, CPSA, audnet, audbal, xnabal, xnaaud } =
    req.body;
  const aLog = new audLog({
    date: datem,
    CRSA: nm83,
    XBA: nm88,
    XSA: "0.00",
    CPSA: nm86,
    audnet: nm89,
    audbal: nm90,
    xnabal: nm91,
    xnaaud: nm92,
  });
  // const aLog= new audLog({CRSA:CRSA,XBA:XBA ,XSA:XSA ,
  //   CPSA:CPSA ,audnet:audnet ,audbal:audbal ,xnabal:xnabal ,xnaaud:xnaaud });
  aLog.save();
  //   .then(()=>{
  //     res.status(201).json({message:"AUD LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered aud log"}))
};
router.post("/audlog", signUpAudLog);

//SIGNUP XNA LOG ROUTE
const signUpXnaLog = async (req, res) => {
  const {
    memberno,
    name,
    surname,
    description,
    xnadeposit,
    xnawithdraw,
    balance,
  } = req.body;
  const w = await Member.findOne({ memberno: req.session.membersno });
  var nul = 0;
  var nul2 = nul.toFixed(10);
  for (var i = 1; i <= 3; i++) {
    if (i == 1) {
      let bal = (
        Math.floor((parseFloat(nm02) + parseFloat(nm17)) * 1000000000) /
        1000000000
      ).toFixed(10);
      const memberXnaLog = new xnaLog({
        memberno: req.session.membersno,
        name: w.name,
        surname: w.surname,
        description: "First Payment",
        xnawithdraw: nul2,
        xnadeposit: nm17,
        balance: bal,
      });
      memberXnaLog.save();
    } else if (i == 2) {
      let bal = (
        Math.floor(
          (parseFloat(nm02) + parseFloat(nm17) - parseFloat(nm21)) * 1000000000
        ) / 1000000000
      ).toFixed(10);
      var k = parseFloat(nm02) + parseFloat(nm17) - parseFloat(nm21);
      const memberXnaLog = new xnaLog({
        memberno: req.session.membersno,
        name: w.name,
        surname: w.surname,
        description: "Membership Fees",
        xnawithdraw: nm21,
        xnadeposit: nul2,
        balance: bal,
      });
      memberXnaLog.save();
    } else if (i == 3) {
      for (var j = 1; j <= 12; j++) {
        const s = await referral.findOne({ memberno: req.session.membersno });

        var q = j;
        if (j == 1) {
          let bal = (
            Math.floor((parseFloat(k) + parseFloat(nm26)) * 1000000000) /
            1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl1 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm26,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 2) {
          let bal = (
            Math.floor(
              (parseFloat(k) + parseFloat(nm26) + parseFloat(nm31)) * 1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl2 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm31,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 3) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl3 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm36,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 4) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl4 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm41,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 5) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl5 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm46,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 6) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl6 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm51,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 7) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl7 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm56,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 8) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56) +
                parseFloat(nm61)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl8 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm61,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 9) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56) +
                parseFloat(nm61) +
                parseFloat(nm66)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl9 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm66,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 10) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56) +
                parseFloat(nm61) +
                parseFloat(nm66) +
                parseFloat(nm71)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl10 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm71,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 11) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56) +
                parseFloat(nm61) +
                parseFloat(nm66) +
                parseFloat(nm71) +
                parseFloat(nm76)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl11 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + j,
            xnawithdraw: nul2,
            xnadeposit: nm76,
            balance: bal,
          });
          memberXnaLog.save();
        } else if (j == 12) {
          let bal = (
            Math.floor(
              (parseFloat(k) +
                parseFloat(nm26) +
                parseFloat(nm31) +
                parseFloat(nm36) +
                parseFloat(nm41) +
                parseFloat(nm46) +
                parseFloat(nm51) +
                parseFloat(nm56) +
                parseFloat(nm61) +
                parseFloat(nm66) +
                parseFloat(nm71) +
                parseFloat(nm76) +
                parseFloat(nm81)) *
                1000000000
            ) / 1000000000
          ).toFixed(10);
          const t = await Member.findOne({ memberno: s.rlvl12 });
          const memberXnaLog = new xnaLog({
            memberno: t.memberno,
            name: t.name,
            surname: t.surname,
            description: "Referral Payment LVL" + q,
            xnawithdraw: nul2,
            xnadeposit: nm81,
            balance: bal,
          });
          memberXnaLog.save();
          //  .then(()=>{
          //        res.status(201).json({message:"XNA Log Registered"});
          //    }).catch((err)=>res.status(500).json({error:"Failed to Register xna log"}))
        }
      }
    }
  }
};
router.post("/xnalog", signUpXnaLog);

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      SIGNUP OTP ROUTE            *********************************/
//****************************************************************************************************/
//****************************************************************************************************/

router.post("/checkinviteOtpCode", async (req, res) => {
  const { vOtpCode } = req.body;

  const mm = await InviteMember.findOne({ singupotp: vOtpCode }).sort({
    $natural: -1,
  });
  if (mm) {
    const ie = await Member.findOne({ email: mm.invitoremail });
    let ie_memberno = ie.memberno;
    res.status(201).json({ ie_memberno });
  } else {
    res.status(501).json({ error: "OTP code expired. Kindly regenrate it." });
  }
  //   res.status(201).json({message:"Code Verified"});
  //  res.status(500).json({error:"Code Not Verified"})
});
router.post("/InviteMemberReq", async (req, res) => {
  const { newMemberEmail, code, memberEmail } = req.body;
  const im = new InviteMember({
    invitoremail: memberEmail,
    invitedemail: newMemberEmail,
    singupotp: code,
  });
  im.save()
    .then(() => {
      res.status(201).json({ message: "Email sent to Invited Member" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Fail to send email to invited member" })
    );
});

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************          LOGIN ROUTE         *************************************/
//****************************************************************************************************/
//****************************************************************************************************/

var memberInfo = [];
var xnaLogInfo = [];

router.post("/memberlogin", async (req, res) => {
  let token;
  try {
    const { memberno, password } = req.body;
    if (!memberno || !password) {
      return res.status(422).json({ error: "Fill all Fields" });
    }
    const memberLogin = await Member.findOne({ memberno: memberno }); // ye purey us doc ka data dedega
    const xnafind = await xnaLog.find({ memberno: memberno });
    memberInfo = memberLogin;
    xnaLogInfo = xnafind;
    if (memberLogin) {
      if (memberLogin.password === password) {
        req.session.membersno = memberLogin.memberno;
        req.session.membersname = memberLogin.name;
        memberLoginname = req.session.membersname;
        res.json(req.session.membersno);
      } else {
        res.status(401).json({ error: "Invalid Password" });
      }
    } else {
      res.status(400).json({ error: "Invalid MemberNo" });
    }
  } catch (err) {
    console.log(err);
  }
});

//*********************************          LOGOUT ROUTE        *************************************/

router.post("/logout", async (req, res) => {
  req.session.destroy();
  res.json("Successfully Logout");
});

//*********************************          ADMIN ROUTE         *************************************/

var adminNo, AdminName;
router.post("/adminlogin", async (req, res) => {
  try {
    const { adminno, adminpswd } = req.body;
    if (!adminno || !adminpswd) {
      return res.status(422).json({ error: "Fill all Fields" });
    }
    const adminLogin = await Admin.findOne({ adminno: adminno }); // ye purey us doc ka data dedega
    AdminName = adminLogin.adminname;
    if (adminLogin) {
      if (adminLogin.adminpswd === adminpswd) {
        adminNo = adminno;
        res.json({ message: "Login Successfully" });
      } else {
        res.status(400).json({ error: "Invalid Admin No or Password" });
      }
    } else {
      res.status(400).json({ error: "Invalid Admin No or Password" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/adminget", async (req, res) => {
  const an = await Admin.findOne({ adminno: adminNo });
  res.json({ an });
});

//*********************************      MEMBER INFORMATION      *************************************/

router.get("/memberinfo", async (req, res) => {
  const memberLogin = await Member.findOne({ memberno: req.session.membersno }); // ye purey us doc ka data dedega
  res.json({ memberLogin });
});

//*********************************      MEMBER STATEMENT        *************************************/

router.get("/statement", async (req, res) => {
  const stat = await xnaLog.find({ memberno: req.session.membersno });
  res.json({ stat });
});

//*********************************      BUY SELL ROUTE          *************************************/

var bsc11,
  bsc23,
  bsc22,
  bsc21,
  bsc10,
  bsc15,
  bsc18,
  bsc11,
  bsc12,
  bsc14,
  bsc13,
  bsc16,
  bsc17,
  bsc19,
  bsc20,
  bsc24,
  bsc25,
  bsc26,
  bsc27,
  bsc28,
  bsc29,
  bsc30,
  bsc31,
  bsc32;
var mm, mn, ms, des;
router.post("/buysellroute", async (req, res) => {
  const { description, MemBuyInAud, MemSellInXna } = req.body;
  var f = "M-3200";
  const xna = await xnaLog.findOne({}).sort({ $natural: -1 });
  const aud = await audLog.findOne({}).sort({ $natural: -1 });
  const company = await companyLog.findOne({}).sort({ $natural: -1 });
  const memberr = await Member.findOne({ memberno: req.session.membersno });
  const cs = await compSet.findOne({}).sort({ $natural: -1 });
  const cS = await compSet.findOne({}).sort({ $natural: -1 });

  var ui = cS.ExRate;

  var eRate = parseFloat(cS.ExRate) / parseFloat(100);

  var bsc02 = (Math.floor(xna.balance * 1000000000) / 1000000000).toFixed(10);

  var bsc03 = parseFloat(aud.audbal).toFixed(2);

  var bsc04 = parseFloat(company.CB).toFixed(2);

  bsc11 = parseFloat(MemBuyInAud).toFixed(2);

  bsc12 = (
    Math.floor(parseFloat(MemSellInXna) * 1000000000) / 1000000000
  ).toFixed(10);

  bsc18 = (Math.floor(aud.xnaaud * 1000000000) / 1000000000).toFixed(10);

  bsc19 = (
    Math.floor(
      parseFloat(parseFloat(bsc18) * (1 + parseFloat(eRate))) * 1000000000
    ) / 1000000000
  ).toFixed(10);

  bsc10 = (
    Math.floor(parseFloat(parseFloat(bsc11) / parseFloat(bsc19)) * 1000000000) /
    1000000000
  ).toFixed(10);

  bsc20 = (
    Math.floor(
      parseFloat(parseFloat(bsc18) * (1 - parseFloat(eRate))) * 1000000000
    ) / 1000000000
  ).toFixed(10);

  bsc13 = (
    Math.floor(parseFloat(parseFloat(bsc12) * parseFloat(bsc20)) * 100) / 100
  ).toFixed(2);

  bsc14 = (
    Math.floor(parseFloat(parseFloat(bsc11) / parseFloat(bsc18)) * 1000000000) /
    1000000000
  ).toFixed(10);

  bsc15 = (
    Math.floor(parseFloat(parseFloat(bsc10) * parseFloat(bsc18)) * 100) / 100
  ).toFixed(2);

  bsc16 = (
    Math.floor(parseFloat(parseFloat(bsc13) / parseFloat(bsc18)) * 1000000000) /
    1000000000
  ).toFixed(10); // / or * ?

  bsc17 = (
    Math.floor(parseFloat(parseFloat(bsc12) * parseFloat(bsc18)) * 100) / 100
  ).toFixed(2); // / or *?

  bsc21 = parseFloat(parseFloat(bsc11) - parseFloat(bsc15)).toFixed(2);

  bsc22 = parseFloat(parseFloat(bsc17) - parseFloat(bsc13)).toFixed(2);

  bsc23 = parseFloat(parseFloat(bsc21) + parseFloat(bsc22)).toFixed(2);

  bsc24 = parseFloat(cs.CompPSP).toFixed(2);

  bsc25 = parseFloat(bsc23).toFixed(2);
  bsc26 = (
    Math.ceil(parseFloat(parseFloat(bsc25) * (parseFloat(bsc24) / 100)) * 100) /
    100
  ).toFixed(2);

  bsc27 = parseFloat(parseFloat(bsc25) - parseFloat(bsc26)).toFixed(2);

  bsc28 = parseFloat(
    parseFloat(bsc15) - parseFloat(bsc13) + parseFloat(bsc26)
  ).toFixed(2);

  bsc29 = parseFloat(parseFloat(bsc04) + parseFloat(bsc27)).toFixed(2);

  bsc30 = (
    Math.floor(
      parseFloat(parseFloat(bsc02) + parseFloat(bsc10) - parseFloat(bsc12)) *
        1000000000
    ) / 1000000000
  ).toFixed(10);

  bsc31 = parseFloat(parseFloat(bsc03) + parseFloat(bsc28)).toFixed(2); // bsc31=bsc28

  bsc32 = (
    Math.floor(parseFloat(parseFloat(bsc31) / parseFloat(bsc30)) * 1000000000) /
    1000000000
  ).toFixed(10);

  const buysellrecord = new buysell({
    PrevXnaBal: bsc02,
    PrevAudBal: bsc03,
    PrevCompanyBal: bsc04,
    memberno: memberr.memberno,
    name: memberr.name,
    surname: memberr.surname,
    description,
    MemBuyInXna: bsc10,
    MemBuyInAud: bsc11,
    MemSellInXna: bsc12,
    MemSellInAud: bsc13,
    MemBuyReelXna: bsc14,
    MemBuyReelAud: bsc15,
    MemSellReelXna: bsc16,
    MemSellReelAud: bsc17,
    PrevXnaAud: bsc18,
    XnaAudBuyRate: bsc19,
    XnaAudSellRate: bsc20,
    BuyXnaDiffAud: bsc21,
    SellXnaDiffAud: bsc22,
    CompanyExchangeIncomeAud: bsc23,
    CompanyProfitSharePer: bsc24,
    CompanyGrossBeforeShareAud: bsc25,
    CompanyProfitShareAud: bsc26,
    CompanyNetAud: bsc27,
    AudNet: bsc28,
    CompanyBal: bsc29,
    XnaBal: bsc30,
    AudBal: bsc31,
    XNAAUD: bsc32,
  });
  buysellrecord.save().then(() => {
    mm = memberr.memberno;
    mn = memberr.name;
    ms = memberr.surname;
    des = description;
    buySellCompanyLog(req, res);
    buySellXnaLog(req, res);
    buySellAudLog(req, res);
  });
});

//BUYSELL COMPANY LOG ROUTE
const buySellCompanyLog = async (req, res) => {
  const {
    date,
    CMI,
    CRS,
    CEI,
    CII,
    CO,
    CIA,
    CIRC,
    CIP,
    CPSP,
    CGBS,
    CPS,
    CN,
    CB,
  } = req.body;
  const cLog = new companyLog({
    CMI: "0.00",
    CRS: "0.00",
    CEI: bsc23,
    CII: "0.00",
    CO: "0.00",
    CIA: "0.00",
    CIRC: "0.00",
    CIP: "0.00",
    CPSP: bsc24,
    CGBS: bsc25,
    CPS: bsc26,
    CN: bsc27,
    CB: bsc29,
  });
  cLog.save();
  // .then(()=>{
  //     res.status(201).json({message:"COMPANY LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered company log"}))
};
router.post("/companylog", buySellCompanyLog);

//BUYSELL AUD LOG ROUTE
const buySellAudLog = async (req, res) => {
  const aLog = new audLog({
    CRSA: "0.00",
    XBA: bsc15,
    XSA: bsc13,
    CPSA: bsc26,
    audnet: bsc28,
    audbal: bsc31,
    xnabal: bsc30,
    xnaaud: bsc32,
  });
  aLog.save();
  //   .then(()=>{
  //     res.status(201).json({message:"AUD LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered aud log"}))
};
router.post("/audlog", buySellAudLog);

//BUYSELL XNA LOG ROUTE
const buySellXnaLog = async (req, res) => {
  const xLog = new xnaLog({
    memberno: mm,
    name: mn,
    surname: ms,
    description: des,
    xnadeposit: bsc10,
    xnawithdraw: bsc12,
    balance: bsc30,
  });
  xLog.save();
  // .then(()=>{
  //     res.status(201).json({message:"XNA BUY SELL LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered xna buy sell log"}))
};
router.post("/xnabuyselllog", buySellXnaLog);

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      COMPANY CALCULATION ROUTE      ******************************/
//****************************************************************************************************/
//****************************************************************************************************/

var cai06,
  cai07,
  cai08,
  cai09,
  cai10,
  cai11,
  cai12,
  cai13,
  cai14,
  cai15,
  cai16,
  cai17,
  cai18;

const companyInputSettingAfterEXE = async (req, res) => {
  const xna = await xnaLog.findOne({}).sort({ $natural: -1 });
  const aud = await audLog.findOne({}).sort({ $natural: -1 });
  const company = await companyLog.findOne({}).sort({ $natural: -1 });
  const cIS = await compInpSet.findOne({}).sort({ $natural: -1 });
  const cS = await compSet.findOne({}).sort({ $natural: -1 });
  var cai02 = (Math.floor(xna.balance * 1000000000) / 1000000000).toFixed(10);
  var cai03 = parseFloat(aud.audbal).toFixed(2);
  var cai04 = parseFloat(company.CB).toFixed(2);
  var cai05 = (Math.floor(aud.xnaaud * 1000000000) / 1000000000).toFixed(10);
  cai06 = parseFloat(cIS.InIncA).toFixed(2);
  cai07 = parseFloat(cIS.CompOutA).toFixed(2);
  cai08 = parseFloat(cIS.CompInvestAmA).toFixed(2);
  cai09 = parseFloat(cIS.CompInvestRetCapA).toFixed(2);
  cai10 = parseFloat(cIS.CompInvestProA).toFixed(2);
  cai11 = parseFloat(cS.CompPSP).toFixed(2);
  cai12 = parseFloat(parseFloat(cai06) + parseFloat(cai10)).toFixed(2); //0+100=100
  cai06 = parseFloat(cIS.InIncA).toFixed(2);
  cai07 = parseFloat(cIS.CompOutA).toFixed(2);
  cai08 = parseFloat(cIS.CompInvestAmA).toFixed(2);
  cai09 = parseFloat(cIS.CompInvestRetCapA).toFixed(2);
  cai10 = parseFloat(cIS.CompInvestProA).toFixed(2);
  cai11 = parseFloat(cS.CompPSP).toFixed(2);
  cai12 = parseFloat(parseFloat(cai06) + parseFloat(cai10)).toFixed(2); //0+100=100
  cai13 = parseFloat((parseFloat(cai11) / 100) * parseFloat(cai12)).toFixed(2); //0.2*100=20
  cai14 = parseFloat(
    parseFloat(cai06) -
      parseFloat(cai07) -
      parseFloat(cai08) +
      parseFloat(cai09) +
      parseFloat(cai10) -
      parseFloat(cai13)
  ).toFixed(2);
  cai15 = parseFloat(parseFloat(cai04) + parseFloat(cai14)).toFixed(2);
  cai16 = parseFloat(parseFloat(cai03) + parseFloat(cai13)).toFixed(2);
  cai17 = (
    Math.floor(parseFloat(parseFloat(cai02)) * 1000000000) / 1000000000
  ).toFixed(10);
  cai18 = (
    Math.floor(parseFloat(parseFloat(cai16) / parseFloat(cai17)) * 1000000000) /
    1000000000
  ).toFixed(10);

  const cpc = new companyCalc({
    PrevXnaBal: cai02,
    PrevAudBal: cai03,
    PrevCompanyBal: cai04,
    PrevXnaAud: cai05,
    CompanyInterestIncomeAud: cai06,
    CompanyOutgoingsAud: cai07,
    CompanyInvestAmountAud: cai08,
    CompanyInvestReturnCapitalAud: cai09,
    CompanyInvestProfitAud: cai10,
    CompanyProfitSharePer: cai11,
    CompanyGrossBeforeShareAud: cai12,
    CompanyProfitShareAud: cai13,
    CompanyNetAud: cai14,
    CompanyBal: cai15,
    AudBal: cai16,
    XnaBal: cai17,
    XNAAUD: cai18,
  });
  cpc.save().then(() => {
    companyCalculationCompanyLog(req, res);
    companyCalculationAudLog(req, res);
    //   res.status(201).json({message:"Company REGISTERED"});
    // }).catch((err)=>res.status(500).json({error:"Failed to registered BuySell log"}))
  });
};
router.post("/companycalcroute", companyInputSettingAfterEXE);

//COMPNAY CALCULATION COMPANY LOG ROUTE
const companyCalculationCompanyLog = async (req, res) => {
  const {
    date,
    CMI,
    CRS,
    CEI,
    CII,
    CO,
    CIA,
    CIRC,
    CIP,
    CPSP,
    CGBS,
    CPS,
    CN,
    CB,
  } = req.body;
  const cLog = new companyLog({
    CMI: "0.00",
    CRS: "0.00",
    CEI: "0.00",
    CII: cai06,
    CO: cai07,
    CIA: cai08,
    CIRC: cai09,
    CIP: cai10,
    CPSP: cai11,
    CGBS: cai12,
    CPS: cai13,
    CN: cai14,
    CB: cai15,
  });
  cLog.save();
  // .then(()=>{
  //     res.status(201).json({message:"COMPANY LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered company log"}))
};
router.post("/companylog", companyCalculationCompanyLog);

//COMPNAY CALCULATION AUD LOG ROUTE
const companyCalculationAudLog = async (req, res) => {
  const { date, CRSA, XBA, XSA, CPSA, audnet, audbal, xnabal, xnaaud } =
    req.body;
  const aLog = new audLog({
    CRSA: "0.00",
    XBA: "0.00",
    XSA: "0.00",
    CPSA: cai13,
    audnet: cai13,
    audbal: cai16,
    xnabal: cai17,
    xnaaud: cai18,
  });
  aLog.save();
  //   .then(()=>{
  //     res.status(201).json({message:"AUD LOG REGISTERED"});
  // }).catch((err)=>res.status(500).json({error:"Failed to registered aud log"}))
};
router.post("/audlog", companyCalculationAudLog);

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************           TRANSFER ROUTE            ******************************/
//****************************************************************************************************/
//****************************************************************************************************/
var searchMember;

router.post("/searchmember", async (req, res) => {
  const { memberno } = req.body;
  const csl = await Member.findOne({ memberno: memberno });
  // msg(req,res);
  if (csl == null || csl == undefined || csl == []) {
    res.status(401).json({ error: "Member Not Found" });
  } else {
    searchMember = csl.memberno;
    res.json({ csl });
  }
});

var b1, b2, sd, rd, n1, n2, nn1, nn2, ns1, ns2, tx;

router.post("/transferpost", async (req, res) => {
  const { SendDesc, TxnaWithdraw } = req.body;

  const mm = await Member.findOne({ memberno: req.session.membersno });
  const csl = await Member.findOne({ memberno: searchMember });
  const xna = await xnaLog.findOne({}).sort({ $natural: -1 });
  var xnabal = (Math.floor(xna.balance * 1000000000) / 1000000000).toFixed(10);
  b1 = (
    Math.floor(
      parseFloat(parseFloat(xna.balance) - parseFloat(TxnaWithdraw)) *
        1000000000
    ) / 1000000000
  ).toFixed(10);
  b2 = (
    Math.floor(
      parseFloat(parseFloat(b1) + parseFloat(TxnaWithdraw)) * 1000000000
    ) / 1000000000
  ).toFixed(10);
  sd = "Transer to " + searchMember + " (" + SendDesc + ").";
  rd = "Transer from " + req.session.membersno + " (" + SendDesc + ").";
  n1 = mm.memberno;
  n2 = csl.memberno;
  nn1 = mm.name;
  nn2 = csl.name;
  ns1 = mm.surname;
  ns2 = csl.surname;
  tx = Math.floor(parseFloat(TxnaWithdraw)).toFixed(10);
  const bs = new transfer({
    PrevXnaBal: xnabal,
    SendMemNo: mm.memberno,
    SendMemName: mm.name,
    SendMemSurname: mm.surname,
    SendDesc: sd,
    RecMemNo: csl.memberno,
    RecMemName: csl.name,
    RecMemSurname: csl.surname,
    RecDesc: rd,
    TxnaWithdraw: tx,
    TxnaDep: TxnaWithdraw,
    BalOne: b1,
    BalTwo: b2,
  });
  bs.save().then(() => {
    xnatransfer(req, res);
    // res.status(201).json({message:"Transfer Done"});
    // }).catch((err)=>res.status(500).json({error:"Transfer Failed"}))
  });
});

const xnatransfer = async (req, res) => {
  var nul = 0;
  var nul2 = nul.toFixed(10);
  for (let i = 1; i <= 2; i++) {
    if (i == 1) {
      const xLog = new xnaLog({
        memberno: n1,
        name: nn1,
        surname: ns1,
        description: sd,
        xnadeposit: nul2,
        xnawithdraw: tx,
        balance: b1,
      });
      xLog.save();
    } else if (i == 2) {
      const xLog = new xnaLog({
        memberno: n2,
        name: nn2,
        surname: ns2,
        description: rd,
        xnadeposit: tx,
        xnawithdraw: nul2,
        balance: b2,
      });
      xLog
        .save()
        .then(() => {
          res.status(201).json({ message: "XNA Transfer LOG REGISTERED" });
        })
        .catch((err) =>
          res
            .status(500)
            .json({ error: "Failed to registered xna transfer log" })
        );
    }
  }
};
router.post("/xnatransferpost", xnatransfer);

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      MEMBER FEE SETTING ROUTE       ******************************/
//****************************************************************************************************/
//****************************************************************************************************/
router.get("/memfeeget", async (req, res) => {
  const mf2 = await MemberFee.find({}).sort({ $natural: -1 }).limit(1);
  res.json({ mf2 });
});
const memberFeeSettingPost = async (req, res) => {
  const { AUD, NewMembershipInvest, MonthlyMembershipFee } = req.body;
  const al = await audLog.find({}).sort({ $natural: -1 }).limit(1);
  let cad = (parseFloat(AUD) / 0.902026).toFixed(2);
  let chf = (parseFloat(AUD) / 0.653507).toFixed(2);
  let eur = (parseFloat(AUD) / 0.632402).toFixed(2);
  let gbp = (parseFloat(AUD) / 0.529241).toFixed(2);
  let kwd = (parseFloat(AUD) / 0.22).toFixed(2);
  let tryn = (parseFloat(AUD) / 9.622975).toFixed(2);
  let usd = (parseFloat(AUD) / 0.717391).toFixed(2);
  let xna = (parseFloat(AUD) / parseFloat(al[0].xnaaud)).toFixed(2);
  const mf = new MemberFee({
    adminname: req.session.membersname,
    adminno: req.session.membersno,
    AUD: AUD,
    CAD: cad,
    CHF: chf,
    EUR: eur,
    GBP: gbp,
    KWD: kwd,
    TRY: tryn,
    USD: usd,
    XNA: xna,
    NewMembershipInvest: NewMembershipInvest,
    MonthlyMembershipFee: MonthlyMembershipFee,
  });
  mf.save()
    .then(() => {
      res.status(201).json({ message: "Updated Membership Fee Setting" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed To Updated Membership Fee" })
    );
};
router.post("/memfee", memberFeeSettingPost);
router.post("/refpaypost", async (req, res) => {
  const {
    RefPerLVL1,
    RefPerLVL2,
    RefPerLVL3,
    RefPerLVL4,
    RefPerLVL5,
    RefPerLVL6,
    RefPerLVL7,
    RefPerLVL8,
    RefPerLVL9,
    RefPerLVL10,
    RefPerLVL11,
    RefPerLVL12,
  } = req.body;
  let v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
  v1 = parseFloat(RefPerLVL1);
  v2 = parseFloat(RefPerLVL2);
  v3 = parseFloat(RefPerLVL3);
  v4 = parseFloat(RefPerLVL4);
  v5 = parseFloat(RefPerLVL5);
  v6 = parseFloat(RefPerLVL6);
  v7 = parseFloat(RefPerLVL7);
  v8 = parseFloat(RefPerLVL8);
  v9 = parseFloat(RefPerLVL9);
  v10 = parseFloat(RefPerLVL10);
  v11 = parseFloat(RefPerLVL11);
  v12 = parseFloat(RefPerLVL12);

  let x = v1 + v2 + v3 + v4 + v5 + v6 + v7 + v8 + v9 + v10 + v11 + v12;

  let y = x.toFixed(2);
  const rf = new refPay({
    adminname: req.session.membersname,
    adminno: req.session.membersno,
    RefPerLVL1: v1,
    RefPerLVL2: v2,
    RefPerLVL3: v3,
    RefPerLVL4: v4,
    RefPerLVL5: v5,
    RefPerLVL6: v6,
    RefPerLVL7: v7,
    RefPerLVL8: v8,
    RefPerLVL9: v9,
    RefPerLVL10: v10,
    RefPerLVL11: v11,
    RefPerLVL12: v12,
    TotRef: y,
  });
  rf.save()
    .then(() => {
      res.status(201).json({ message: "RefPay REGISTERED" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to registered RefPay" })
    );
});
router.get("/refpayget", async (req, res) => {
  const rf2 = await refPay.find({}).sort({ $natural: -1 }).limit(1);
  res.json({ rf2 });
});
router.put("/refpayput", async (req, res) => {
  let _id = "6158953af441496d862452d6";
  var doc = {
    TNAME: req.body.tname,
    TVALUE: req.body.tvalue,
  };
  refPay.findOneAndUpdate(
    { _id: _id },
    { $set: { [doc.TNAME]: req.body.tvalue } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
});
router.put("/memberInfoUpdate", async (req, res) => {
  const {
    refmno,
    name,
    surname,
    email,
    phone,
    address,
    postcode,
    state,
    country,
    bankaccinfo,
    memberno,
    password,
    payAud,
    date,
    prefCurrency,
  } = req.body;
  var _id = req.body._id;
  var UpdatedMemInfo = {
    refmno: refmno,
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    address: address,
    postcode: postcode,
    state: state,
    country: country,
    bankaccinfo: bankaccinfo,
    memberno: memberno,
    password: password,
    payAud: payAud,
    date: date,
    prefCurrency: [prefCurrency],
  };
  Member.findOneAndUpdate(
    _id,
    UpdatedMemInfo,
    { new: true },
    function (err, UpdatedMemInfo) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(UpdatedMemInfo);
      }
    }
  );
});
router.post("/compSetpost", async (req, res) => {
  const { CompPSP, ExRate } = req.body;
  const cs = new compSet({
    adminname: req.session.membersname,
    adminno: req.session.membersno,
    CompPSP,
    ExRate,
  });
  cs.save()
    .then(() => {
      res.status(201).json({ message: "compSet REGISTERED" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to registered compSet" })
    );
});
const compSetAllRoute = async (req, res) => {
  const cs2 = await compSet.find({}).sort({ $natural: -1 }).limit(1);
  res.json({ cs2 });
};
router.get("/compSetget", compSetAllRoute);
router.put("/compSetput", async (req, res) => {
  let _id = "6164a093d47fe9224fab2311";
  // compSetAllRoute(req,res);
  var doc = {
    TNAME: req.body.tname,
    TVALUE: req.body.tvalue,
  };
  compSet.findOneAndUpdate(
    { _id: _id },
    { $set: { [doc.TNAME]: req.body.tvalue } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
});
router.post("/buysellSetpost", async (req, res) => {
  const { BLFAAUD, BLP, SLP, MBL, MSL } = req.body;
  const bs = new buysellSet({
    adminname: req.session.membersname,
    adminno: req.session.membersno,
    BLFAAUD,
    BLP,
    SLP,
    MBL,
    MSL,
  });
  bs.save()
    .then(() => {
      res.status(201).json({ message: "buysellSet REGISTERED" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to registered buysellSet" })
    );
});
router.get("/buysellSetget", async (req, res) => {
  const bs2 = await buysellSet.find({}).sort({ $natural: -1 }).limit(1);
  res.json({ bs2 });
});
router.put("/buysellSetput", async (req, res) => {
  let _id = "6158ca32ab52c93c4fc75d89";
  var doc = {
    TNAME: req.body.tname,
    TVALUE: req.body.tvalue,
  };
  buysellSet.findOneAndUpdate(
    { _id: _id },
    { $set: { [doc.TNAME]: req.body.tvalue } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }
      console.log(doc);
    }
  );
});
router.post("/compInpSetpost", async (req, res) => {
  const { InIncA, CompOutA, CompInvestAmA, CompInvestRetCapA, CompInvestProA } =
    req.body;
  const cs = new compInpSet({
    adminname: req.session.membersname,
    adminno: req.session.membersno,
    InIncA,
    CompOutA,
    CompInvestAmA,
    CompInvestRetCapA,
    CompInvestProA,
  });
  cs.save()
    .then(() => {
      companyInputSettingAfterEXE(req, res);
      res.status(201).json({ message: "compInputSet REGISTERED" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to registered compInputSet" })
    );
});
const compInpSetAllRoute = async (req, res) => {
  const cs2 = await compInpSet.find({}).limit(1);
  res.json({ cs2 });
};
router.get("/compInpSetget", compInpSetAllRoute);
const compInpSetLogRoute = async (req, res) => {
  const cs2 = await compInpSet.find({});
  res.json({ cs2 });
};
router.get("/compInpSetLogget", compInpSetLogRoute);
router.get("/xnalogget", async (req, res) => {
  const xl = await xnaLog.find({});
  res.json({ xl });
});
router.get("/audlogget", async (req, res) => {
  const al = await audLog.find({});
  res.json({ al });
});
router.get("/memberslogget", async (req, res) => {
  const ml = await MemberLog.find({}).sort({ $natural: -1 });
  res.json({ ml });
});
router.get("/companylogget", async (req, res) => {
  const cl = await companyLog.find({});
  res.json({ cl });
});
router.get("/rateslogget", async (req, res) => {
  const rl = await MemberFee.find({});
  res.json({ rl });
});
router.get("/memfeelogsetget", async (req, res) => {
  const rl = await MemberFee.find({}).skip(1).sort({ $natural: 1 });
  res.json({ rl });
});
router.get("/refpaylogsetget", async (req, res) => {
  const rl = await refPay.find({});
  res.json({ rl });
});
router.get("/complogsetget", async (req, res) => {
  const rl = await compSet.find({});
  res.json({ rl });
});
router.get("/buyselllogsetget", async (req, res) => {
  const rl = await buysellSet.find({});
  res.json({ rl });
});
router.get("/xnalastget", async (req, res) => {
  const xl = await xnaLog.find({}).sort({ $natural: -1 }).limit(1);
  // var xl2=xl.balance;
  res.json({ xl });
});
router.get("/audlastget", async (req, res) => {
  const al = await audLog.find({}).sort({ $natural: -1 }).limit(1);
  // var al2=al.audnet;
  res.json({ al });
});
router.get("/companylastget", async (req, res) => {
  const cl = await companyLog.find({}).sort({ $natural: -1 }).limit(1);
  // var cl2=cl.CB;
  res.json({ cl });
});
router.get("/complastsetget", async (req, res) => {
  const csl = await compSet.find({}).sort({ $natural: -1 }).limit(1);
  res.json({ csl });
});
router.get("/membersfeelastget", async (req, res) => {
  const ml = await MemberFee.findOne({}).sort({ $natural: -1 }).limit(1);
  res.json({ ml });
});
router.get("/memberlastget", async (req, res) => {
  const ml = await Member.findOne({}).sort({ $natural: -1 }).limit(1);
  res.json({ ml });
});

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      RESET PASSWORD ROUTE        *********************************/
//****************************************************************************************************/
//****************************************************************************************************/
var ResetPasswordEmail = "";
var ResetPasswordEmailCode;
var NewPswd = "";

const storeEmailCode = async (req, res) => {
  const fp = new ForgotPassword({
    email: ResetPasswordEmail,
    otp: ResetPasswordEmailCode,
  });
  fp.save()
    .then(() => {
      res.status(201).json({ message: "Reset Password OTP saved" });
    })
    .catch((err) =>
      res.status(500).json({ error: "Failed to save Reset Password OTP" })
    );
};
router.post("/emailcode", storeEmailCode);

router.post("/findemail", async (req, res) => {
  const { findEmail, code } = req.body;
  ResetPasswordEmail = findEmail;
  ResetPasswordEmailCode = code;
  const mm = await Member.findOne({ email: findEmail });
  if (mm) {
    storeEmailCode(req, res);
  }
  // res.status(201).json({message:"Email Found"});
  //  res.status(500).json({error:"Email Not Found"})
});

const updatePaswordRequest = async (req, res) => {
  var email = "taimurkhan1850@gmail.com";
  var UpdatedPswd = {
    password: NewPswd,
  };
  Member.findOneAndUpdate(
    { email: email },
    UpdatedPswd,
    { new: true },
    function (err, UpdatedPswd) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(UpdatedPswd);
      }
    }
  );
};
router.put("/updatePasword", updatePaswordRequest);

router.post("/checkOtpCode", async (req, res) => {
  const { vOtpCode, vPswd } = req.body;
  NewPswd = vPswd;
  if (ResetPasswordEmail) {
    const mm = await ForgotPassword.findOne({ email: ResetPasswordEmail }).sort(
      { $natural: -1 }
    );
    if (mm) {
      if (mm.otp == vOtpCode) {
        updatePaswordRequest(req, res);
      }
    }
  } else {
    res.status(501).json({ error: "OTP code expired. Kindly regenrate it." });
  }
  //   res.status(201).json({message:"Code Verified"});
  //  res.status(500).json({error:"Code Not Verified"})
});

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      MEMBER INFO MODIFICATION ROUTE     **************************/
//****************************************************************************************************/
//****************************************************************************************************/
router.get("/memberinfoget", async (req, res) => {
  const mi = await Member.find({});
  res.json({ mi });
});
router.put("/memberinfoupdateadmin", async (req, res) => {
  const {
    _id,
    id,
    refmno,
    name,
    surname,
    email,
    phone,
    address,
    postcode,
    state,
    country,
    bankaccinfo,
    memberno,
    password,
    payAud,
    date,
    category,
    prefCurrency,
  } = req.body;
  var UpdatedMemInfo = {
    refmno: refmno,
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    address: address,
    postcode: postcode,
    state: state,
    country: country,
    bankaccinfo: bankaccinfo,
    memberno: memberno,
    password: password,
    payAud: payAud,
    category: category,
    date: date,
    prefCurrency: prefCurrency,
  };

  Member.findOneAndUpdate(
    { _id: _id },
    UpdatedMemInfo,
    { new: true },
    function (err, UpdatedMemInfo) {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(UpdatedMemInfo);
      }
    }
  );
});

//****************************************************************************************************/
//****************************************************************************************************/
//*********************************      PREFERRED CURRENCY ROUTE       ******************************/
//****************************************************************************************************/
//****************************************************************************************************/
const signUppreferredCurrency = async (req, res) => {
  const {
    memberno,
    PCurr_One,
    PCurr_Two,
    PCurr_Three,
    PCurr_Four,
    PCurr_Five,
  } = req.body;
  const pc = new PrefCurr({
    memberno: req.session.membersno,
    PCurr_One: PCurr_One,
    PCurr_Two: PCurr_Two,
    PCurr_Three: PCurr_Three,
    PCurr_Four: PCurr_Four,
    PCurr_Five: PCurr_Five,
  });
  pc.save();
  //   .then(()=>{
  //   res.status(201).json({status: 0,message:"Preffered Currencies Registered"});
  // }).catch((err)=>{
  //    res.status(500).json({status: 1,error:"Preffered Currencies Not Registered"})})
};
router.post("/prefferedCurrencyPOST", signUppreferredCurrency);
const prefferedCurrencyGet = async (req, res) => {
  const { usercookie } = req.body;
  const pfg = await PrefCurr.find({ memberno: req.session.membersno });
  res.json({ pfg });
};
router.get("/prefferedCurrencyGET", prefferedCurrencyGet);
router.put("/pCurrencyUpdate", async (req, res) => {
  let memberno = req.body.memberno;
  var doc = {
    TNAME: req.body.tname,
    TVALUE: req.body.tvalue,
  };
  PrefCurr.findOneAndUpdate(
    { memberno: memberno },
    { $set: { [doc.TNAME]: req.body.tvalue } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log("err", err);
        res.status(500).send(err);
      } else {
        console.log("success");
        res.send(doc);
      }
    }
  );
});
router.get("/findreferralmembers", async (req, res) => {
  var array = [];
  const refxna = await Member.find({ memberno: req.session.membersno });
  var newMemberNoReferral = refxna[0].refmno;
  array.push(newMemberNoReferral);

  for (var i = 0; i < 11; i++) {
    const b = await Member.find({ memberno: array.slice(-1) });
    if (b != null) {
      array.push(b[0].refmno);
    } else {
      array.push(array.slice(-1));
    }
  }
  const ref = new referral({
    memberno: req.session.membersno,
    rlvl1: array[0],
    rlvl2: array[1],
    rlvl3: array[2],
    rlvl4: array[3],
    rlvl5: array[4],
    rlvl6: array[5],
    rlvl7: array[6],
    rlvl8: array[7],
    rlvl9: array[8],
    rlvl10: array[9],
    rlvl11: array[10],
    rlvl12: array[11],
  });
  ref.save();
  // .then(()=>{
  //     res.status(201).json({message:"ref Registered"});
  // }).catch((err)=>res.status(500).json({error:"Failed to Register xna log"}))
});
module.exports = router;

// const storeEmailCode = async (req, res) => {
//   const fp= new ForgotPassword ({email:ResetPasswordEmail,otp:ResetPasswordEmailCode});
//       fp.save().then(()=>{
//       res.status(201).json({message:"Reset Password OTP saved"});
//     }).catch((err)=>res.status(500).json({error:"Failed to save Reset Password OTP"}))
//   };
//   router.post('/emailcode',storeEmailCode);

// router.get("/memberloginfo", async (req, res) => {
//   res.json({ memberInfo });
// });

// router.get("/xnaloginforoute", async (req, res) => {
//   // const xnacomp=await xnaLog.find({})
//   console.log("Route Working");
//   console.log(xnaLogInfo);
//   res.json({ xnaLogInfo });
// });

// router.get("/memberloginfodetail", async (req, res) => {
//   const mld = await MemberLog.findOne({ memberno: req.session.membersno });
//   console.log("Member Log Detail");
//   console.log(mld);
//   res.json({ mld });
// });
