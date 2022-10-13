const express=require("express");
const router=express.Router();
const{showDays}=require("../controllers/daysController")


router.get("/days/:id",showDays);

module.exports=router