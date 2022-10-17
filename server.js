const express = require("express");
const app = express();
const port = 8000;
const interviewsRoute=require('./backend/server-api/routes/interviewsRoute')
const apiRouteDay=require('./backend/server-api/routes/dayRoute')
const cors = require('cors');
// Require for the socket.io
const http=require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(cors({
    origin:"*",
    credentials:true,
}
))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/',apiRouteDay)

app.use('/interviews',interviewsRoute);

server.listen(port, () => console.log(`Server is running on port ${port}`));

// Web sockets

io.on("connection",socket=>{
    socket.on("appointment-monday",(data)=>{
        console.log(data)
    })
})
