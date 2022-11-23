const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Mongodb 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b699yx9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const appointmentOptionCollection = client.db('doctorsPortal').collection('appointmentOptions');
        
        app.get('/appointmentOptions', async(req, res) =>{
            const query = {};
            const options = await appointmentOptionCollection.find(query).toArray();
            res.send(options);
        })
    }
    finally{

    }

}
run().catch(console.log);

app.get('/', async(req, res)=>{
    res.send('Doctors portal server is running');
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`));