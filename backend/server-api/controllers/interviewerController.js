const {dbCredentials}=require("../helpers/dbconfig")
const {Pool}=require("pg");


const  showInterviewers=(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    
    const pool = new Pool(dbCredentials);
    pool.query("select ai.day_id, ai.interviewer_id, i.name, i.avatar from interviewers i inner join available_interviewers ai on i.id = ai.interviewer_id order by day_id ")
    .then((result)=>result.rows)
    .then((interviewers)=>res.json(interviewers))
    .catch((err)=>console.log(err))
    .finally(()=>pool.end);
}

module.exports={
    showInterviewers
}