const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

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

    const database = client.db("secure_travel")
    const planCollection = database.collection('plans')
    
    // GET API
    // app.get('/plans', async(req,res)=>{
    //   const cursor = planCollection.find({})
    //   const plans = await cursor.toArray()
    //   res.json(plans)
    //   console.log(result);
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