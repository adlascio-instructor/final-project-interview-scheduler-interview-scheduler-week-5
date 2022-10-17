const {dbCredentials}=require("../helpers/dbconfig");
const {Pool}=require("pg");

const  showDays=(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    
    const pool = new Pool(dbCredentials);
    pool.query("SELECT  a.day_id as id, d.name as name,  count(CASE WHEN i.id  is null THEN  a.day_id END) as spots  FROM day d  LEFT JOIN appointments a on d.id = a.day_id  LEFT JOIN interviews i on a.id = i.appointment_id GROUP BY a.day_id, d.name  ORDER BY a.day_id")
    .then((result)=>result.rows)
    .then(
        (days)=> {
            const vDays = {}

            days.forEach( day =>{
               vDays[day.name] = {
                 id: day.id,
                 name: day.name,
                 spots: day.spots,
               }
            } )

                res.json(vDays)
        }
        
        )
    .catch((err)=>console.log(err))
    .finally(()=>pool.end);
}


module.exports={
    showDays
}