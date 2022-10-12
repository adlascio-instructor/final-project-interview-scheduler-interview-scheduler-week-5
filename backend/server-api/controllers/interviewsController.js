const {dbCredentials}=require("../helpers/dbconfig")



const  showInterviews=(req,res)=>{
    res.send(console.log(dbCredentials))
}

module.exports={
    showInterviews
}