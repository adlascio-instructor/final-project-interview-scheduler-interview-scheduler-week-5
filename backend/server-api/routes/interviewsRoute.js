const express=require("express");
const router=express.Router();
const{showInterviews,
    addInterview,
    editInterview,
    deleteInterview,
}=require("../controllers/interviewsController")


router.get("/:id",showInterviews);

router.post("/book",addInterview);
router.post("/:id/edit",editInterview);
router.post("/:id/delete",deleteInterview);


module.exports=router