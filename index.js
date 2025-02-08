const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
const authrouter = require('./routes/authrouter')

app.use(express.json());
// app.get("/",(req,res)=>{
//     res.send("hello publicccccc....");
// })
app.use("/auth",authrouter);

app.listen(PORT,()=>{
    console.log("listening at port",PORT);
});