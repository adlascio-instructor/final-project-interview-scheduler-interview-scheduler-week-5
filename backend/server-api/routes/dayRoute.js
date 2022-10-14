const express=require("express");
const router=express.Router();
const{showDays}=require("../controllers/daysController")


router.get("/days",showDays);

module.exports=router