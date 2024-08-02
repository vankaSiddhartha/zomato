const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const MONGO_URI =
  "mongodb+srv://jaswanthkumarchodavarapu:027027027@zomato.cpdygdx.mongodb.net/Z4?retryWrites=true&w=majority&appName=Zomato";

// Read data from file
const dataFilePath = path.join(__dirname, "../data/file1_combined.json");
const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
console.log("MONGO_URI:", MONGO_URI);
console.log(`Loaded ${data.length} records`);
const client = new MongoClient(MONGO_URI, {});

const seedDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("Z4"); // Specify your database name
    const collection = db.collection("restaurants"); // Specify your collection name

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted`);
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    await client.close(); // Ensure connection is closed
  }
};

seedDatabase();
