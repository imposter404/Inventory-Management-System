const express = require('express')
const {MongoClient}=require('mongodb')
const app = express()
const cors = require('cors')
const port=8080
app.use(cors())
app.use(express.json());

const orders_fetch= require("./../src/Components/data/Order.json")
const products_fetch= require("./../src/Components/data/product.json")
const mongo=new MongoClient('mongodb://localhost:27017')

mongo.connect()
const db=mongo.db("POS")
const Orders=db.collection("Orders")
const Products=db.collection("Products")

const host_mongo=true // without mongo
var delay=2000

app.get('/api/data/Orders',(req,res)=>{

  if(host_mongo){
    // const result= async ()=>{ res.json({ msg:await Orders.find({}).toArray() }) }
    const result= async ()=>{ res.json({ msg:await Orders.aggregate([
      {$addFields: {date: {$concat: [{$toString: {$dayOfMonth: "$date",},},"/",{$toString: {$month: "$date",},},"/",{$toString: {$year: "$date",},},],},},},
    ]).toArray() }) }
    // setTimeout(()=>{
      result()
    // },delay)
  }
  else{
    const data={msg:orders_fetch}
    res.json(data)
  }
})

app.get('/api/data/Products',(req,res)=>{
  if(host_mongo){
    const result= async ()=>{ res.json({ msg:await Products.find({}).toArray()}) }
    setTimeout(()=>{
    result()
    },delay)
  }
  else{
    const data={msg:orders_fetch}
    res.json(data)
  }
})

app.get('/api/data/Charts',(req,res)=>{
  if(host_mongo){
    const result= async ()=>{ res.json({ msg:{
      week:await Orders.find({date: {$gte:'Jan 20,2020'}}).toArray(),
      month:await Orders.find({date: {$gte:'Jan 1,2020'}}).toArray()
    }}
  )}
    // setTimeout(()=>{
    result()
    // },delay)
  }
  else{
    const data={msg:orders_fetch}
    res.json(data)
  }
})

var invoice=3035
var temp=[]
for(i=0;i<30;i++){
  invoice+=1
  temp.push(
    {"invoice":invoice,"date":new Date(),"status":"paid","customer":{"name":"Arthur Melo","phone":"123456"},
      "items":[
     {"id":1,"product":"Apple","price":"50","quantity":"1","total":"100"},
     {"id":2,"product":"Orange","price":"1","quantity":"2","total":"200"},
     {"id":3,"product":"Mango","price":"2","quantity":"3","total":"300"}
    ],
    "total":100,"profit":10,"mode":"CASH"})
}




var week=Array(8).fill(0).map((e,index)=>(temp=new Date(new Date().getTime()-((8-index-1)*24*60*60*1000)))).map((e)=>(new Object({date:e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear(),revenue:0,profit:0,orders:0,products:0})))
var month=Array(31).fill(0).map((e,index)=>(temp=new Date(new Date().getTime()-((31-index-1)*24*60*60*1000)))).map((e)=>(new Object({date:e.getDate()+"/"+(e.getMonth()+1)+"/"+e.getFullYear(),revenue:0,profit:0,orders:0,products:0})))

app.get('/api/data/d',(req,res)=>{
  if(host_mongo){
    const result= async ()=>{ 
      var mongo_data_month=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date(new Date().getTime()-((31)*24*60*60*1000))}}},
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          '_id': { date:{$concat:[{$toString:{$dayOfMonth:"$date"}},"/",{$toString:{$month:"$date"}},"/",{$toString:{$year:"$date"}}]}}, 
          'revenue': {$sum: '$total'}, 
          'profit': {$sum: '$profit'}, 
          'orders': {$count: {}}, 
          'products': {$sum: '$items_count'}} },
        ]).toArray()
        mongo_data_month.forEach((e)=>{
            const {_id,...temp}=e
          Object.assign(month[month.findIndex((f)=>f.date==e._id.date)],temp)
        })

      var mongo_data_week=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date(new Date().getTime()-((8-1)*24*60*60*1000))}}},
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          '_id': { date:{$concat:[{$toString:{$dayOfMonth:"$date"}},"/",{$toString:{$month:"$date"}},"/",{$toString:{$year:"$date"}}]}}, 
          'revenue': {$sum: '$total'}, 
          'profit': {$sum: '$profit'}, 
          'orders': {$count: {}}, 
          'products': {$sum: '$items_count'}} },
        ]).toArray()
        mongo_data_week.forEach((e)=>{
            const {_id,...temp}=e
          Object.assign(week[week.findIndex((f)=>f.date==e._id.date)],temp)
        })


      var mongo_data_today=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date()}}}, //have issue with current date in nodejs :|
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          '_id': { date:{$concat:[{$toString:{$dayOfMonth:"$date"}},"/",{$toString:{$month:"$date"}},"/",{$toString:{$year:"$date"}}]}}, 
          'revenue': {$sum: '$total'}, 
          'profit': {$sum: '$profit'}, 
          'orders': {$count: {}}, 
          'products': {$sum: '$items_count'}} },
        ])
        .toArray()
        mongo_data_today=mongo_data_today[0]
        mongo_data_today.date=mongo_data_today._id.date
        delete mongo_data_today._id

      var mongo_data_total_month=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date(new Date().getTime()-((31)*24*60*60*1000))}}},
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          _id: {},
          revenue: { $sum: "$total" },
          profit: { $sum: "$profit" },
          orders: { $count: {} },
          products: { $sum: "$items_count" }}
        },
        {$project: {_id: 0} }
        ]).toArray()

      var mongo_data_total_week=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date(new Date().getTime()-((8)*24*60*60*1000))}}},
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          _id: {},
          revenue: { $sum: "$total" },
          profit: { $sum: "$profit" },
          orders: { $count: {} },
          products: { $sum: "$items_count" }}
        },
        {$project: {_id: 0} }
        ]).toArray()

      var mongo_data_total_today=await Orders.aggregate([
        { $match: { 'date': { $gte: new Date()} } },
        { $addFields: {'items_count': {$size: '$items'}}}, 
        { $group: {
          _id: {},
          revenue: { $sum: "$total" },
          profit: { $sum: "$profit" },
          orders: { $count: {} },
          products: { $sum: "$items_count" }}
        },
        {$project: {_id: 0} }
        ]).toArray()

      res.json({ 
      msg:{
        month: month,
        week: week,
        today: mongo_data_today,
        total:{
          month:mongo_data_total_month,
          week:mongo_data_total_week,
          today:mongo_data_total_today
        }
      }
    })}
    setTimeout(()=>{
    result()
    },delay)
  }
  else{
    const data={msg:orders_fetch}
    res.json(data)
  }
})




app.listen(port,()=>{
    console.log('app listening at',port)
})



