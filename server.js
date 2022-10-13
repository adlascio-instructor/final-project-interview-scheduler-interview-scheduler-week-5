const express = require("express");
const app = express();
const port = 8000;
const apiRoute=require('./backend/server-api/routes/interviewsRoute')
// const io=require('socket.io')(3000)

// io.on("connection",socket=>{
//     console.log(socket.id)
// })

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/',apiRoute)
app.listen(port, () => console.log(`Server is running on port ${port}`));
