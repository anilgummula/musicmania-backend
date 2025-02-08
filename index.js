const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hello publicccccc....");
})

app.listen(PORT,()=>{
    console.log("listening at port",PORT);
});