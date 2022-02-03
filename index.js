const mongodb = require("mongodb");
const express = require("express");
const app = express();
// allows  parsing data from the POST request body (aka `req.body`)
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();

const client = new mongodb.MongoClient(process.env.MONGO_URL);
  
// connect mongodb data base
const connectClient = async () => {
  await client.connect();
  console.log("Client Connected");
};

// create database and create three collection
const getUserCollection = () => {
  const db = client.db("zhuopu-db");
  const col = db.collection("users");
  return col;
};

const getProductCollection = () => {
  const db = client.db("zhuopu-db");
  const col = db.collection("products");
  return col;
};

const getOrderCollection = () => {
  const db = client.db("zhuopu-db");
  const col = db.collection("orders");
  return col;
};

// //insert data into mongodb
const insertUser = async (user) => {
  const col = getUserCollection();
  await col.insertOne(user);
  console.log("User Inserted!");
};
const insertProduct = async (product) => {
  const col = getProductCollection();
  await col.insertOne(product);
  console.log("Product Inserted!");
};
const insertOrder = async (order) => {
  const col = getOrderCollection();
  await col.insertOne(order);
  console.log("Order Inserted!");
};
// search data in mongodb
const getUsers = async () => {
  const col = getUserCollection();
  const users = await col.find({}).toArray();
  return users;
};
const getPeoducts = async () => {
  const col = getProductCollection();
  const products = await col.find({}).toArray();
  return products;
};
const getOrders = async () => {
  const col = getOrderCollection();
  const orders = await col.find({}).toArray();
  return orders;
};

//connect to mongodb
connectClient();

//get all users
app.get("/getusers", async (req, res) => {
  const users = await getUsers();
  res.send(users);
});
//insert one user
app.post("/insertuser",async(req,res)=>{
    const user = req.body

    // if (!body.name || !body.address || !body.phone) {
    //     res.send({'result': 'failed, missing info....'})
    //     return
    // }

    await insertUser(user)
    res.send({'result': 'success'})
})
//get all products
app.get("/getproducts", async (req, res) => {
  const products = await getPeoducts();
  res.send(products);
});
//insert one product
app.post("/insertproduct",async(req,res)=>{
    const product = req.body
    await insertProduct(product)
    res.send({'result': 'success'})
})
//get all orders
app.get("/getorders", async (req, res) => {
  const orders = await getOrders();
  res.send(orders);
});
//insert one order
app.post("/insertorder",async(req,res)=>{
    const order = req.body
    if(order.userId && order.productId) {
        await insertOrder(order)
        res.send({'result': 'success'})
    }
})














// express port listening 
app.listen(3000, () => {
  console.log("Im here!");
});
