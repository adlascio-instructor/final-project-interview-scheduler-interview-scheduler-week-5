const {dbCredentials}=require("../helpers/dbconfig")
const {Pool}=require("pg");


const  showInterviews=(req,res)=>{
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