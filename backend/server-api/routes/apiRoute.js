const express=require("express");
const router=express.Router();
const{showInterviewsMonday}=require("../controllers/apiController")


router.get("/:id",showInterviewsMonday);


module.exports=router