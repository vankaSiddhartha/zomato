const { MongoClient } = require("mongodb");

const MONGO_URI =
  "mongodb+srv://jaswanthkumarchodavarapu:027027027@zomato.cpdygdx.mongodb.net/Z4?retryWrites=true&w=majority&appName=Zomato";
const DATABASE_NAME = "Z4"; // Replace with your database name

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI, {});
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
};

// Function to get the database instance
const getDb = () => {
  if (!db) {
    throw new Error("Database not connected");
  }
  return db;
};

// Function to find a restaurant by ID
const findRestaurantById = async (id) => {
  const db = getDb();
  const collection = db.collection("restaurants");
  return collection.findOne({ "restaurant.R.res_id": id });
};

// Function to find restaurants by name

module.exports = {
  getDb,
  connectDB,
  findRestaurantById,
};
