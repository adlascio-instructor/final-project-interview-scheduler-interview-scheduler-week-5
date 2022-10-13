const {dbCredentials}=require("../helpers/dbconfig")
const {Pool}=require("pg");


const  showDays=(req,res)=>{
    const pool = new Pool(dbCredentials);
    pool.query("SELECT d.id, d.name, count(a.day_id) as nrAppointments  FROM day d LEFT JOIN appointments a on d.id = a.day_id  GROUP BY d.id, d.name  ORDER BY d.id")
    .then((result)=>result.rows)
    .then((days)=>res.json(days))
    .catch((err)=>console.log(err))
    .finally(()=>pool.end);
}

module.exports={
    showDays
}