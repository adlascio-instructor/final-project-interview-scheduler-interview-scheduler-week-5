const express=require("express");
const router=express.Router();
const{showInterviews}=require("../controllers/interviewsController")


router.get("/interviews/:id",showInterviews);

module.exports=router