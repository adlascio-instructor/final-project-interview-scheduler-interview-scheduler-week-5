const express=require("express");
const router=express.Router();
const{showInterviewers}=require("../controllers/interviewerController")


router.get("/interviewers/:id",showInterviewers);


module.exports=router

