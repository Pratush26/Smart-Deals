import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors());
app.use(express.json());

// ✅ Prevent multiple Firebase initializations
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
      universe_domain: process.env.UNIVERSE_DOMAIN,
    }),
  });
}

const client = new MongoClient(process.env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

// ✅ Cached DB connection for serverless
let cachedDb = null;
async function connectDB() {
  if (cachedDb) return cachedDb;
  await client.connect();
  cachedDb = client.db("smart_db");
  console.log("✅ MongoDB connected!");
  return cachedDb;
}

// ✅ Auth Middleware
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).send("Unauthorized");

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    if (decoded.email !== req.params.email)
      return res.status(403).send("Forbidden");

    next();
  } catch (err) {
    console.error(err);
    res.status(401).send("Unauthorized");
  }
};

// ✅ Routes with fresh DB access inside each request
app.get("/products", async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("products").find({}).toArray();
  res.send(result);
});
app.get('/latest-products', async (req, res) => {
    const db = await connectDB();
    const result = await db.collection("products").find({}).sort({ created_at: 1 }).limit(6).toArray();
    res.send(result)
});
app.get("/categories", async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("category").find({}).toArray();
  res.send(result);
});

app.get("/productById/:id", async (req, res) => {
  const db = await connectDB();
  const result = await db.collection("products").findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(result);
});

app.get("/productsByEmail/:email", verifyToken, async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection("products")
    .find({ email: req.params.email })
    .toArray();
  res.send(result);
});

app.get("/myBids/:email", async (req, res) => {
  const db = await connectDB();
  const bids = await db
    .collection("bids")
    .find({ buyer_email: req.params.email })
    .toArray();

  const productIds = bids.map((b) => b.product);

  const products = await db
    .collection("products")
    .find({ _id: { $in: productIds } })
    .toArray();

  res.send({ bids, products });
});

app.post("/createBid", async (req, res) => {
  try {
    const db = await connectDB();
    req.body.product = new ObjectId(String(req.body.product));
    const result = await db.collection("bids").insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create bid" });
  }
});

app.post("/createProduct", async (req, res) => {
  try {
    const db = await connectDB();
    const { category } = req.body;

    const exist = await db.collection("category").findOne({ name: category });
    if (!exist) await db.collection("category").insertOne({ name: category });

    const result = await db.collection("products").insertOne(req.body);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to create product" });
  }
});

app.get("/", (req, res) => res.send("✅ Server is running!"));

app.listen(PORT, () =>
  console.log(`✅ Local server running on port: ${PORT}`)
);
