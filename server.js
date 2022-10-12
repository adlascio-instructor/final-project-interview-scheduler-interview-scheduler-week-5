const express = require("express");
const app = express();
const port = 8000;
const apiRoute=require('./backend/server-api/routes/apiRoute')

app.use(express.urlencoded({ extended: true }));

app.use('/',apiRoute)
app.listen(port, () => console.log(`Server is running on port ${port}`));
