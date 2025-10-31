import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 2000
const uri = process.env.MONGODB_URL
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    await client.connect();
    const db = client.db('smart_db');
    const productsCollection = db.collection('products');
    const bidsCollection = db.collection('bids');
    app.get('/products', async (req, res) => {
            const cursor = productsCollection.find({});
            const result = await cursor.toArray();
            res.send(result)
        });
  } finally {
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Hello sadddam")
    console.log(uri)
})

app.listen(PORT, () => {
    console.log(`server is communicating in port : ${PORT}`)
})