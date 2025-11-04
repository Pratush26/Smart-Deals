import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
// import admin from 'firebase-admin'
// import serviceAccount from './smart-deals-firebase-adminsdk.json'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 2000
const uri = process.env.MONGODB_URL
app.use(cors());
app.use(express.json());

// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        const db = client.db('smart_db');
        const productsCollection = db.collection('products');
        const bidsCollection = db.collection('bids');

        app.get('/products', async (req, res) => {
            console.log(req.headers.authorization.split(' ')[1])
            const result = await productsCollection.find({}).toArray();
            res.send(result)
        });
        app.get('/latest-products', async (req, res) => {
            const result = await productsCollection.find({}).sort({ created_at: 1 }).limit(6).toArray();
            res.send(result)
        });
        app.get('/productById/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) }
            const result = await productsCollection.findOne(query);
            res.send(result);
        });
        app.get('/productsByEmail/:email', async (req, res) => {
            const result = await productsCollection.find({ email: req.params.email }).toArray();
            res.send(result);
        });
        app.get('/bidsById/:id', async (req, res) => {
            const query = { product: new ObjectId(req.params.id) }
            const result = await bidsCollection.find(query).toArray();
            res.send(result);
        });
        app.get('/myBids/:email', async (req, res) => {
            const bids = await bidsCollection.find({ buyer_email: req.params.email }).toArray();
            const productArr = bids.map(e => e.product)
            const products = await productsCollection.find({ _id: { $in: productArr } }).toArray();
            res.send({ bids, products })
        });
    } finally {
    }
}
run().catch(console.dir);


app.get("/", (req, res) => res.send("Hello sadddam"))

app.listen(PORT, () => console.log(`server is communicating in port : ${PORT}`))