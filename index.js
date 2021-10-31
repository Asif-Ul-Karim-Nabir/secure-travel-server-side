const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//  MidleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jdcg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run () {
  try{
    await client.connect()

    const database = client.db('secure_travel')
    const planCollection = database.collection('plans')
    
    // Get api 
    app.get('/plans', async(req,res)=>{
      const cursor = planCollection.find({})
      const plans = await cursor.toArray()
      res.send(plans)
    })
    // Post  API
    app.post('/plans', async(req,res)=>{
      const plans = req.body
      const result = await planCollection.insertOne(plans)
      res.json(result)
    })
    // get  single  api
    // app.get('plans/:id',async (req,res)=>{
    //   const id = req.params.id
    //   const query = {_id: ObjectId(id)}
    //   const result = await planCollection.findOne(query)
    //   res.json(result)
    // })
  }
  finally{
    // await client.close()
  }
}
 
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})