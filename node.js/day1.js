const express=require("express");
const app=express();


app.use(express.json());


app.get("/res1",(req,res)=>{
    let data={"msg":"res1 is working"}
    res.send(data);
})

app.get("/res2",(req,res)=>{
    let data={"msg":"res2 is working"}
    res.send(data);
})

app.get("/res3",(req,res)=>{
    let data={"msg":"res3 is working"}
    res.send(data);
})

app.post("/create",(req,res)=>{
    console.log(req.body);
    res.send("post is working")
})




app.listen(8000,()=>{
    console.log("Server is running");
})