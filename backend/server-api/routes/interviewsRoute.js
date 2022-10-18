const express=require("express");
const router=express.Router();
const{showInterviews,
    addInterview,
    editInterview,
    deleteInterview,
}=require("../controllers/interviewsController")


router.get("/:id",showInterviews);



module.exports=router