import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import admin from 'firebase-admin';

dotenv.config()
const app = express()
const PORT = process.env.PORT || 2000
const uri = process.env.MONGODB_URL
app.use(cors());
app.use(express.json());

admin.initializeApp({
    credential: admin.credential.cert({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
        universe_domain: process.env.UNIVERSE_DOMAIN,
    }),
});


const verifyToken = async (req, res, next) => {
    if (!req?.headers?.authorization) return res.status(401).send("Unauthorized access");
    try {
        const authentic = await admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1])
        if (req?.params?.email != authentic?.email) return res.status(403).send("Forbidden access");
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send("Unauthorized access");
    }
}

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
        const categoryCollection = db.collection('category');

        app.get('/products', async (req, res) => {
            const result = await productsCollection.find({}).toArray();
            res.send(result)
        });
        app.get('/categories', async (req, res) => {
            const result = await categoryCollection.find({}).toArray();
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
        app.get('/productsByEmail/:email', verifyToken, async (req, res) => {
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
        app.post('/createBid', async (req, res) => {
            try {
                req.body.product = new ObjectId(String(req.body.product));
                const result = await bidsCollection.insertOne(req.body);
                res.send(result);
            } catch (error) {
                console.error('Error creating bid:', error);
                res.status(500).send({ error: 'Failed to create bid' });
            }
        });
        app.post('/createProduct', async (req, res) => {
            try {
                const exist = await categoryCollection.findOne({name: req.body.category});
                if(!exist) await categoryCollection.insertOne({name: req.body.category});
                const result = await productsCollection.insertOne(req.body);
                res.send(result);
            } catch (error) {
                console.error('Error creating bid:', error);
                res.status(500).send({ error: 'Failed to create bid' });
            }
        });
    } finally {
    }
}
run().catch(console.dir);


app.get("/", (req, res) => res.send("Hello sadddam"))

app.listen(PORT, () => console.log(`server is communicating in port : ${PORT}`))