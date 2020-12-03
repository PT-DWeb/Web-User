const { MongoClient } = require("mongodb");

const uri =
    "mongodb+srv://hexad:%23Dd18212227@cluster0.ecnii.mongodb.net/PTUDWeb?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    // Establish and verify connection
    database = await client.db("StoreManager");
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

const db = () => database;

module.exports.db = db;