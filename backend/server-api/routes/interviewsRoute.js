const express=require("express");
const router=express.Router();
const{showInterviews}=require("../controllers/interviewsController")


router.get("/:id",showInterviews);

module.exports=router