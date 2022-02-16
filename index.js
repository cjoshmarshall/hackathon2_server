require('dotenv').config();
const express = require('express');
const mongodb = require('mongodb');
const fetch = require("node-fetch");

const app = express();
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const port = process.env.PORT || 3006;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';

app.use(express.json());
app.get("/",async (req,res)=>{
    res.send("/weekly, /monthly, /yearly");
})

app.get("/weekly",async (req,res)=>{
    try {
        let output = await fetch("https://607432b1066e7e0017e794b3.mockapi.io/weekly");
        let weeklyData = await output.json();
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("money-manager-backend");
        let data = await db.collection('weekly').find().toArray();
        if(data.length === 0) {
            await db.collection('weekly').insertMany(weeklyData);
            let data1 = await db.collection('weekly').find().toArray();
            res.status(200).json({message:"Full Data Inserted",data1});
        }
        if (weeklyData.length!= data.length) {
            for(let i=data.length;i<weeklyData.length;i++){
                await db.collection('weekly').insertOne(weeklyData[i]);   
            }
            let data1 = await db.collection('weekly').find().toArray();  
            res.status(200).json({message:"Data Inserted",data1});
        }else if(data.length === weeklyData.length){
            let data1 = await db.collection('weekly').find().toArray();  
            res.status(200).json({message:"Inserted data",data1});
        }
         else {
            res.status(404).json({message: "No DataFound"});
        }
       client.close();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error."})
    }
})

app.get("/monthly",async (req,res)=>{
    try {
        let output = await fetch("https://607432b1066e7e0017e794b3.mockapi.io/monthly");
        let weeklyData = await output.json();
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("money-manager-backend");
        let data = await db.collection('monthly').find().toArray();
        if(data.length === 0) {
            await db.collection('monthly').insertMany(weeklyData);
            let data1 = await db.collection('monthly').find().toArray();
            res.status(200).json({message:"Full Data Inserted",data1});
        }
        if (weeklyData.length!= data.length) {
            for(let i=data.length;i<weeklyData.length;i++){
                await db.collection('monthly').insertOne(weeklyData[i]);   
            }
            let data1 = await db.collection('monthly').find().toArray();  
            res.status(200).json({message:"Data Inserted",data1});
        }else if(data.length === weeklyData.length){
            let data1 = await db.collection('monthly').find().toArray();  
            res.status(200).json({message:"Inserted data",data1});
        }
         else {
            res.status(404).json({message: "No DataFound"});
        }
       client.close();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error."})
    }
})
app.get("/yearly",async (req,res)=>{
    try {
        let output = await fetch("https://607432b1066e7e0017e794b3.mockapi.io/yearly");
        let weeklyData = await output.json();
        let client = await mongoClient.connect(dbUrl);
        let db = client.db("money-manager-backend");
        let data = await db.collection('yearly').find().toArray();
        if(data.length === 0) {
            await db.collection('yearly').insertMany(weeklyData);
            let data1 = await db.collection('yearly').find().toArray();
            res.status(200).json({message:"Full Data Inserted",data1});
        }
        if (weeklyData.length!= data.length) {
            for(let i=data.length;i<weeklyData.length;i++){
                await db.collection('yearly').insertOne(weeklyData[i]);   
            }
            let data1 = await db.collection('yearly').find().toArray();  
            res.status(200).json({message:"Data Inserted",data1});
        }else if(data.length === weeklyData.length){
            let data1 = await db.collection('yearly').find().toArray();  
            res.status(200).json({message:"Inserted data",data1});
        }
         else {
            res.status(404).json({message: "No DataFound"});
        }
       client.close();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error."})
    }
})
app.listen(port,()=> console.log("The port runs on: " + `${port}`));