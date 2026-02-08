const express=require("express");
const app=express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/server",(req,res)=>{
res.json({
players:23,
map:"Budapest 4-6"
});
});

app.get("/api/vehicles",(req,res)=>{
res.json([
{name:"CAF Urbos"},
{name:"Tatra T5C5"},
{name:"Ganz ICS"}
]);
});

app.get("/api/leaderboard",(req,res)=>{
res.json([
{name:"Gager",km:1200},
{name:"Bence",km:980}
]);
});

app.get("/auth/roblox",(req,res)=>{
res.redirect("https://apis.roblox.com/oauth/");
});

app.listen(3000,()=>console.log("Server fut"));
