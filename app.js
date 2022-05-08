const http = require('http');
const fs = require('fs');
const express = require('express')
const path = require('path')
const { dirname } = require("path");
const bodyparser = require("body-parser");
const { error } = require("console");
const session = require('express-session');
const encoder = bodyparser.urlencoded();
const hostname = '127.0.0.1';
const port = 3000;

const app = express()
app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'))

app.get("/",(req,res) => {
    console.log("HOME PAGE")
    res.sendFile(path.resolve(__dirname,'./public/html/homepageindex.html'))
})

app.get("/teacher_dashboard" , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/html/teacher_dashboard.html'))
})

app.get("/student_dashboard" , (req,res)=>{
    res.sendFile(path.resolve(__dirname,'./public/html/dashboard2.html'))
})

app.post("/auth",(req,res)=>{
    console.log(req.body)
    let role = req.body.role
    if (role == "Teacher"){
        console.log("yes")
        // res.sendFile(path.resolve(__dirname,'./public/html/teacher_dashboard.html'))
        res.redirect('/teacher_dashboard')
    }
    else if(role == "Student"){
        res.redirect('/student_dashboard')
    }
    else{
        res.send.status(404);
    }
    res.end();
});

app.listen(5000)
