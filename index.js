const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const port =process.env.PORT || 4000;

//ema-john
//HyF8HPbeOThxsFY3
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ez3jy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("ema-john");
      const products = database.collection("products");

      
    //data get api
      app.get('/products',async(req,res)=>{
      const curser= products.find({});
      const page=req.query.page;
      const size=parseInt(req.query.size);
      const count =await curser.count();
      let result;
      if(page){
        result=await curser.skip(page*size).limit(size).toArray();
      }else{
        result = await curser.toArray();
      }
      res.send({
          count,
          result
          
        })
      })

      
      
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/',(req,res)=>{
  res.send('our server completed')
})

app.listen(port,()=>{
    console.log('code is runnign port',port);
})