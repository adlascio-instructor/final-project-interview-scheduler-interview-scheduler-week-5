const {dbCredentials}=require("../helpers/dbconfig")
const {Pool}=require("pg");


const  showInterviews=(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Max-Age", "1800");
res.setHeader("Access-Control-Allow-Headers", "content-type");
res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const pool = new Pool(dbCredentials);
    pool.query("SELECT * FROM appointments")
    .then((result)=>result.rows)
    .then((appointments)=>res.json(appointments))
    .catch((err)=>console.log(err))
    .finally(()=>pool.end);
}

module.exports={
    showInterviews
}