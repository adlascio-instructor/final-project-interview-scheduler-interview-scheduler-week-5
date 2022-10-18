const {dbCredentials}=require("../helpers/dbconfig")
const {Pool}=require("pg");


const  showInterviews=(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const pool = new Pool(dbCredentials);
    const day = parseInt(req.params.id);

    pool.query("SELECT  a.id, a.day_id, d.name as day, time, (case when i.id is null then 0 else i.id end) as interview_id,  (case when i.id is null then '' else Student end) as student,  (case when i.id is null then 0 else iw.id end) as interviewer_id, (case when i.id is null then '' else iw.name end) as interviewer, (case when i.id is null then '' else iw.avatar end) as avatar FROM day d  LEFT JOIN appointments a on d.id = a.day_id  LEFT JOIN interviews i on a.id = i.appointment_id   LEFT JOIN interviewers iw on iw.id = i.interviewer_id WHERE a.day_id = $1  ORDER BY a.day_id, right(a.time,2), cast(left(a.time,POSITION(':' in a.time)-1) as integer) ", [day])
    .then((result)=>result.rows)
     .then(
        (interviews)=> {
            const vInterviews = {}
            const vInterview = {}
            const vInterviewer = {}

            interviews.forEach( interview =>{
            if (interview.student ==  ""){
                vInterviews[interview.id]= {
                    id: interview.id, 
                    time: interview.time 
                    }
            }
            else{
            vInterviews[interview.id]= {
                id: interview.id, 
                time: interview.time ,
                interview: { 
                student: interview.student,
                interviewer: { 
                    id: interview.interviewer_id,
                    name: interview.interviewer,
                    avatar: interview.interviewer_avatar,
                    },
                }
                }
            }
            } )

            res.json(vInterviews)
    }
    
    )
    .catch((err)=>console.log(err))
    .finally(()=>pool.end);
   }


//=============================================

   const  addInterview=(socket)=>{
    socket.on("appointments",(data)=>{

        const pool = new Pool(dbCredentials);
        const interviews=Object.values(data);
        interviews.forEach((item)=>{
            if(item.interview != undefined){
                const id=item
                const student =item.interview.student ;
                const interviewerID = item.interview.interviewer.id;
                const appointmentID = item.id;
            
                pool.query("INSERT INTO  interviews(id,student, interviewer_id, appointment_id) VALUES($1,$2,$3)", [student, interviewerID, appointmentID])
                .then((result)=>result.rows)
                 .then(()=> showInterviews())
                 .catch((err)=>console.log(err))
                 .finally(()=>pool.end);
            }
        })

    })

    }


    
//=============================================

   const  editInterview=(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
    const pool = new Pool(dbCredentials);
    const interviewID = parseInt(req.params.id);
    const student = req.params.student;
    const interviewerID = parseInt(req.params.interviewerID);
    const appointmentID = parseInt(req.params.appointmentID);
    socket.on("edit_interview", () => {
    pool.query("UPDATE Interview SET student = $2, interviewer_id= $3, appointment_id= $4  WHERE id= $1", [interviewID, student, interviewerID, appointmentID])
    .then((result)=>result.rows)
     .then(()=> showInterviews())
     .catch((err)=>console.log(err))
     .finally(()=>pool.end);
    })
    socket.broadcast.emit("interview_edited")
    }
 

    
//=============================================

    const  deleteInterview=(req,res)=>{
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Max-Age", "1800");
        res.setHeader("Access-Control-Allow-Headers", "content-type");
        res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
        const pool = new Pool(dbCredentials);
        const interviewID = parseInt(req.params.id);
    
        pool.query("DELETE FROM Interview WHERE id= $1 ", [interviewID])
        .then((result)=>result.rows)
        .then(()=> showInterviews())
        .catch((err)=>console.log(err))
        .finally(()=>pool.end);
        }
    

    module.exports={
        showInterviews,
        addInterview,
        editInterview,
        deleteInterview,
    }

    